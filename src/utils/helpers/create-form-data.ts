export const createFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    console.log(data.logo[0], 'data');
    if (key === 'logo') {
      formData.append(`logo`, data.logo[0]);
    } else {
      formData.append(key, data[key] !== null ? data[key].toString() : '');
    }
  });

  return formData;
};
