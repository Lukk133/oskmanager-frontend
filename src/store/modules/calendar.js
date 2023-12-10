export default {
    state: {
        instructorsIds: [],
        date: 0,
        selectedDates: []
    },
    getters: {
        getInstructorsIds: state => state.instructorsIds,
        getDate: state => state.date,
        getSelectedDates: state => state.selectedDates,
    },
    mutations: {
        setInstructorsIds(state, instructors) {
            state.instructorsIds = instructors;
        },
        addInstructorId(state, instructorId) {
            if (!state.instructorsIds.includes(instructorId)) {
                state.instructorsIds.push(instructorId);
            }
        },
        setDate(state, date) {
            state.date = date;
        },
        setSelectedDates(state, dates) {
            state.selectedDates = dates;
        },
        addSelectedDate(state, date) {
            if (!state.selectedDates.includes(date)) {
                state.selectedDates.push(date);
            }
        }
    },
    actions: {
    }
};
