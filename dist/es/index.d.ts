import { ReactElement } from 'react';
interface ReactShadowDOMParameters {
    document: Document;
    element: HTMLElement;
    content: ReactElement;
}
export default function ReactShadowDOM({ document, element, content }: ReactShadowDOMParameters): ReactElement;
export {};
