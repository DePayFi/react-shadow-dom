import { ReactElement } from 'react';
interface ReactShadowDOMParameters {
    document: Document;
    element: HTMLElement;
    content: ReactElement;
    styles?: string;
}
export default function ReactShadowDOM({ document, element, content, styles }: ReactShadowDOMParameters): ReactElement;
export {};
