export type HeroBlock = {
    id: string;
    type: "hero";
    title: string;
    subtitle?: string;
};

export type TextBlock = {
    id: string;
    type: "text";
    text: string;
};

export type ImageBlock = {
    id: string;
    type: "image";
    src: string;
    alt?: string;
};

export type ButtonBlock = {
    id: string;
    type: "button";
    label: string;
    href: string;
};

export type FormBlock = {
    id: string;
    type: "form";
    title?: string;
};

export type Block = HeroBlock | TextBlock | ImageBlock | ButtonBlock | FormBlock;

export type SiteSchema = {
    slug: string;
    blocks: Block[];
};


