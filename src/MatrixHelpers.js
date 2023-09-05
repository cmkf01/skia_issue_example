import { Skia, MatrixIndex } from "@shopify/react-native-skia";

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

export const scale = (matrix, s, origin) => {
  "worklet";
  const source = Skia.Matrix(matrix.get());
  source.translate(origin.x, origin.y);
  source.scale(s, s);
  source.translate(-origin.x, -origin.y);
  return source;
};

export const translate = (matrix, x, y) => {
  "worklet";
  const m = Skia.Matrix();
  m.translate(x, y);
  m.concat(matrix);
  return m;
};

export const move = (x, y) => {
  "worklet";
  const p = Skia.Path.Make();
  p.moveTo(x, y);
  return p;
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
