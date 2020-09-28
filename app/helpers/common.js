import slugify from 'slugify';

export const slugifyName = string => (string ? slugify(string, '-') : null);

export const getFieldOfObj = obj => {
  let query = [];

  for (const property in obj) {
    const i = 1;
    const j = i + Object.keys(obj).indexOf(property);

    query = [
      ...query,
      `${property}=$${j}`,
    ];
  }

  return query;
};
