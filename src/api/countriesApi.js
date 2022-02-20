import axiosClient from "./axiosClient";

const countriesApi = {
    getCountries: () => {
        const url = 'all?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders,cca3';
        return axiosClient.get(url);
    },
    detail: (country, params) => {
        const url = 'name/' + country;
        return axiosClient.get(url, params);
    },
    getBorders: (borders, params) => {
        const url = "alpha?codes=" + borders;
        return axiosClient.get(url, params)
    }
}

export default countriesApi;