import {
  PaintStyle,
  Skia,
  StrokeCap,
  StrokeJoin,
} from '@shopify/react-native-skia';

export const paint = Skia.Paint();
paint.setAntiAlias(true);
paint.setColor(Skia.Color('red'));
paint.setStyle(PaintStyle.Stroke);
paint.setStrokeWidth(4);
paint.setAlphaf(0.5);
paint.setStrokeCap(StrokeCap.Round);
paint.setStrokeJoin(StrokeJoin.Round);
