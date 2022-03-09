import { shapes } from "../interfaces/IConsole";

export default function GetShapeTitle(shape: shapes): string {
    switch (shape) {
        case shapes.SHAPE1:
            return "Oval";
        case shapes.SHAPE2:
            return "Whatever";
        default:
            return "Unknown";
    }
}