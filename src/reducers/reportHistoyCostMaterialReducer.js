import { MATERIALS_FETCHED, FETCHING_MATERIALS, FETCHING_MATERIALS_ERROR, REPORT_MATERIAL_COST_HISTORY_FETCHED, REPORT_FETCHING_MATERIAL_COST_HISTORY, REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR, REPORT_MATERIAL_COST_HISTORY_FETCHED_DATA, REPORT_FETCHING_MATERIAL_COST_HISTORY_DATA, REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR_DATA, ACCOUNT_LOGOUT} from '../constants/actionTypes';

const initState = {
    listMaterial: [],
    listMaterialCostHistoryData: [],
    loadingMaterial: false,
    loadingMaterialCostHistory: false,

    CharData: {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Histórico de Costos por Región'
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: []
    }
};




const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCHING_MATERIALS:
            return {
                ...state,
                loadingMaterial: true
            };
        case MATERIALS_FETCHED:
            return {
                ...state,
                listMaterial: action.list,
                CharData: {
                    ...state.CharData,
                    series: []
                },
                listMaterialCostHistoryData: [],
                loadingMaterial: false
            };
        case FETCHING_MATERIALS_ERROR:
            return {
                ...state,
                loadingMaterial: false
            };

        case REPORT_FETCHING_MATERIAL_COST_HISTORY:
            return {
                ...state,
                loadingMaterialCostHistory: true
            };
        case REPORT_MATERIAL_COST_HISTORY_FETCHED:
            return {
                ...state,
                CharData: {
                    ...state.CharData,
                    series: action.list
                },
                loadingMaterialCostHistory: false
            };
        case REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR:
            return {
                ...state,
                loadingMaterialCostHistory: false
            };


        case REPORT_FETCHING_MATERIAL_COST_HISTORY_DATA:
            return {
                ...state,
                loadingMaterialCostHistory: true
            };
        case REPORT_MATERIAL_COST_HISTORY_FETCHED_DATA:
            return {
                ...state,
                listMaterialCostHistoryData: action.list,
                loadingMaterialCostHistory: false
            };
        case REPORT_FETCHING_MATERIAL_COST_HISTORY_ERROR_DATA:
            return {
                ...state,
                loadingMaterialCostHistory: false
            };
        case ACCOUNT_LOGOUT:
            return initState;
        default:
            return state;
    }
};

export default reducer;