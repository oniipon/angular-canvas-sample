import { CanvasModule } from './canvas.module';

describe('CanvasWriteModule', () => {
  let canvasWriteModule: CanvasModule;

  beforeEach(() => {
    canvasWriteModule = new CanvasModule();
  });

  it('should create an instance', () => {
    expect(canvasWriteModule).toBeTruthy();
  });
});
