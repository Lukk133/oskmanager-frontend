import axios from "axios";

const URL_FILE_INFOS = '/files';

const defaultFileInfo = {}

export default {
    state: {
        fileInfo: { ...defaultFileInfo },
        fileInfos: [],
    },
    getters: {
        getFileInfo: state => state.fileInfo,
        getFileInfoId: state => state.fileInfo.id,
        getFileInfos: state => state.fileInfos,
    },
    mutations: {
        setFileInfo(state, data) {
            state.fileInfo = data;
        },
        initFileInfo(state) {
            state.fileInfo = { ...defaultFileInfo }
        },
        setFileInfos(state, data) {
            state.fileInfos = data;
        },
    },
    actions: {
        async uploadFile({ commit }, file) {
            try {
                let formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`${URL_FILE_INFOS}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                commit('setFileInfo', response.data);

            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle the error as per your requirement
            }
        }
    }
}
