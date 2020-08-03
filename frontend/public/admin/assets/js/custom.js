(() => {
    $('.btn-danger').click(function (evt) {
        response = window.confirm('Are You Sure You Want To Do This');
        if (!response) {
            evt.preventDefault();
        }
    });
})();