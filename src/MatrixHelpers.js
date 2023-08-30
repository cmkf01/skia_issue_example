import {Skia, MatrixIndex} from '@shopify/react-native-skia';

const decomposeMatrix = matrix => {
  'worklet';
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
  'worklet';
  const source = Skia.Matrix(matrix.get());
  source.translate(origin.x, origin.y);
  source.scale(s, s);
  source.translate(-origin.x, -origin.y);
  return source;
};

export const translate = (matrix, x, y) => {
  'worklet';
  const m = Skia.Matrix();
  m.translate(x, y);
  m.concat(matrix);
  return m;
};

export const toM4 = m3 => {
  'worklet';
  const decomposedMatrix = decomposeMatrix(m3.get());
  const {sx, skewY, skewX, sy, persp0, persp1, persp2, tx, ty} =
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

export const invertMatrix = matrix => {
  'worklet';
  const {sx, skewY, skewX, sy, tx, ty} = decomposeMatrix(matrix.get());

  const det = sx * sy - skewY * skewX;
  if (Math.abs(det) < 1e-10) {
    return null; // matrix is not invertible
  }

  const invDet = 1.0 / det;
  const inverted = Skia.Matrix();
  inverted.concat([
    sy * invDet,
    -skewY * invDet,
    -skewX * invDet,
    sx * invDet,
    (skewX * ty - sy * tx) * invDet,
    (skewY * tx - sx * ty) * invDet,
  ]);
  return inverted;
};

export const transformPointWithInvertedMatrix = (matrix, x, y) => {
  const invertedMatrix = invertMatrix(matrix);
  const {sx, skewY, skewX, sy, tx, ty} = decomposeMatrix(invertedMatrix.get());
  return [sx * x + skewX * y + tx, skewY * x + sy * y + ty];
};
