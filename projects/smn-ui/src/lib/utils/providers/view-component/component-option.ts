import ComponentOptionOverlay from './component-option-overlay';
import ComponentOptionCoordinate from './component-option-coordinate';

export default interface ComponentOption {
    overlay?: ComponentOptionOverlay;
    coordinate?: ComponentOptionCoordinate;
    width?: number;
    onEmbeddedNode?: Function;
}
