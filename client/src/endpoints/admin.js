import axios from 'axios';

export const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`;

export const allServiceOwners = () => {
    const url = `${domain}/admin/service-owners`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const deleteServiceOwner = (id) => {
    const url = `${domain}/admin/service-owners/${id}/delete`;

    return axios.delete(url,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const getCategories = () => {
    const url = `${domain}/admin/categories`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const categoryData = (category) => {
    const formData = new FormData();
    formData.set('name', category.name);
    if(category.image.length > 0) formData.append('image', category.image[0]);
    return formData;
}

export const addCategory = (category) => {
    const url = `${domain}/admin/categories`;
    const formData = categoryData(category);

    return axios.post(url, formData,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data)
            return res.data;
    })
    .catch(err => err);
}

export const updateCategory = (category) => {
    const url = `${domain}/admin/categories/${category._id}`;
    const formData = categoryData(category);

    return axios.put(url, formData,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
        if(res.data) return res.data;
    })
    .catch(err => err);
}