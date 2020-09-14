import slugify from 'slugify';

export const slugifyName = string => (string ? slugify(string, '-') : null);
