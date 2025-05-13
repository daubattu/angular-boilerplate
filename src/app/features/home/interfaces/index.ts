type ComlumnSize = 'sm' | 'md' | 'lg'

export interface IColumn {
    key: string;
    label: string;
    onToogle?: Function;
    size?: ComlumnSize;
    compareKey?: string;
    format?: Function;
}