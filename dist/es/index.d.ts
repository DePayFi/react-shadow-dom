import { ReactElement } from 'react';
interface ReactShadowDOMParameters {
    document: Document;
    element: HTMLElement;
    content: any;
    outsideStyle?: string;
    insideStyle?: string;
}
export default function ReactShadowDOM({ document, element, content, outsideStyle, insideStyle, }: ReactShadowDOMParameters): ReactElement;
export {};
