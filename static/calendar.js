const startDatePicker = flatpickr("#start-date", {
    dateFormat: "d-m-Y",
    minDate: "today",
    maxDate: new Date().fp_incr(14),
    enableTime: false,
    onClose: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 1) {
            instance.setDate(selectedDates[0]);
        }
    }
});

const endDatePicker = flatpickr("#end-date", {
    dateFormat: "d-m-Y",
    minDate: "today",
    maxDate: new Date().fp_incr(14),
    enableTime: false,
    onClose: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 1) {
            instance.setDate(selectedDates[0]);
        }
    }
});

document.getElementById("clear-dates").addEventListener("click", function() {
    startDatePicker.clear();
    endDatePicker.clear();
});