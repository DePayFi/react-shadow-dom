import { ReactElement } from 'react';
interface ReactShadowDOMParameters {
    document: Document;
    element: HTMLElement;
    content: ReactElement;
    outsideStyles?: string;
}
export default function ReactShadowDOM({ document, element, content, outsideStyles, }: ReactShadowDOMParameters): ReactElement;
export {};
