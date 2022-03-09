import { IConsole, shapes } from "../interfaces/IConsole";
import shape0Builder from "./shape0Builder";
import shape1Builder from "./shape1Builder";

export default function Build(props: IConsole): string {
    switch (props.shape) {
        case shapes.SHAPE1:
            return shape0Builder(props);
        default:
            return shape1Builder(props);
    }
}