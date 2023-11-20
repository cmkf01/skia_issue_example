import {
  MatrixIndex,
  Skia,
  notifyChange,
  rect,
} from "@shopify/react-native-skia";

const decomposeMatrix = matrix => {
  "worklet";
  return {
    tx: matrix[MatrixIndex.TransX],
    ty: matrix[MatrixIndex.TransY],
    sx: matrix[MatrixIndex.ScaleX],
    sy: matrix[MatrixIndex.ScaleY],
    skewX: matrix[MatrixIndex.SkewX],
    skewY: matrix[MatrixIndex.SkewY],
    persp0: matrix[MatrixIndex.Persp0],
    persp1: matrix[MatrixIndex.Persp1],
    persp2: matrix[MatrixIndex.Persp2],
  };
};

export const scale = (matrix, offset, s, origin) => {
  "worklet";
  const source = matrix.value;
  source.identity();
  source.concat(offset);
  source.translate(origin.x, origin.y);
  source.scale(s, s);
  source.translate(-origin.x, -origin.y);
  notifyChange(matrix);
};

export const translate = (matrix, x, y) => {
  "worklet";
  const source = matrix.value;
  source.postTranslate(x, y);
  notifyChange(matrix);
};

export const toM4 = m3 => {
  "worklet";
  const decomposedMatrix = decomposeMatrix(m3.get());
  const { sx, skewY, skewX, sy, persp0, persp1, persp2, tx, ty } =
    decomposedMatrix;
  return [
    sx,
    skewY,
    persp0,
    0,
    skewX,
    sy,
    persp1,
    0,
    0,
    0,
    1,
    0,
    tx,
    ty,
    persp2,
    1,
  ];
};

const getImageDimensions = skImage => {
  "worklet";
  const imageWidth = skImage.width();
  const imageHeight = skImage.height();
  return { imageWidth, imageHeight };
};

export const createOffscreenSnapshot = (
  skImage,
  bound,
  windowWidth,
  windowHeight,
) => {
  "worklet";
  const { imageWidth, imageHeight } = getImageDimensions(skImage);
  const { x, y, width: boundWidth, height: boundHeight } = bound;

  console.log("Window Width:", windowWidth, "Height:", windowHeight);
  console.log("Image Width:", imageWidth, "Height:", imageHeight);

  const windowAspectRatio = windowWidth / windowHeight;
  const imageAspectRatio = imageWidth / imageHeight;

  console.log("Window Aspect Ratio:", windowAspectRatio);
  console.log("Image Aspect Ratio:", imageAspectRatio);

  let effectiveWidth, effectiveHeight;

  if (imageAspectRatio > windowAspectRatio) {
    // Image is wider than screen
    effectiveWidth = windowWidth;
    effectiveHeight = windowWidth / imageAspectRatio;
  } else {
    // Image is taller than screen
    effectiveWidth = windowHeight * imageAspectRatio;
    effectiveHeight = windowHeight;
  }

  console.log("Effective Width:", effectiveWidth, "Height:", effectiveHeight);
  // these issues are to do with fit of the rendered image not matrix trasnform
  // -2.5 is roughly correct horizontal offset regardless of distance from centre
  // when image is "fill" scaled
  const scaleFactorWidth = imageWidth / effectiveWidth - 2.5;
  // lower half of image needs negative offset +/-0.75 is roughly correct
  // vertical offset distance from centre but inreases as further from centre
  const scaleFactorHeight = imageHeight / effectiveHeight;

  console.log(
    "Scale Factor Width:",
    scaleFactorWidth,
    "Height:",
    scaleFactorHeight,
  );

  const transformedBound = rect(
    x * scaleFactorWidth,
    y * scaleFactorHeight,
    boundWidth * scaleFactorWidth,
    boundHeight * scaleFactorHeight,
  );

  console.log("Original Bounds:", bound);
  console.log("Transformed Bounds:", transformedBound);

  const surface = Skia.Surface.MakeOffscreen(imageWidth, imageHeight);
  if (!surface) {
    throw new Error("Couldn't load the image");
  }
  const canvas = surface.getCanvas();
  canvas.drawImage(skImage, 0, 0);
  surface.flush();
  return surface.makeImageSnapshot(transformedBound);
};
