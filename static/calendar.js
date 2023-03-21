const startDatePicker = flatpickr("#start-date", {
    dateFormat: "Y-m-d H:i",
    minDate: new Date(2023, 2, 8, 0, 0), // 8 de marzo del 2023 a las 00:00 AM
    maxDate: "today",
    enableTime: true,
    onClose: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 1) {
            instance.setDate(selectedDates[0]);
        }
        endDatePicker.set("minDate", dateStr);
    },
    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 1) {
            endDatePicker.set("minDate", dateStr);
        }
    }
});

const endDatePicker = flatpickr("#end-date", {
    dateFormat: "Y-m-d H:i",
    minDate: startDatePicker.selectedDates[0],
    maxDate: "today",
    enableTime: true,
    onClose: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 1) {
            instance.setDate(selectedDates[0]);
        }
    }
});

document.getElementById("clear-dates").addEventListener("click", function() {
    startDatePicker.clear();
    endDatePicker.clear();
    endDatePicker.set("minDate", null);
});
