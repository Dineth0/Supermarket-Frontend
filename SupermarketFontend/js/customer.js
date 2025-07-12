getAllCustomers();
function saveCustomer() {

    let name = $('#name').val();
    let address = $('#address').val();
    let number = $('#number').val();

    console.log(name);

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/customer/saveCustomer",
        async: true,
        data: JSON.stringify({
            "cusId": null,
            "cusName": name,
            "cusAddress": address,
            "cusPhone": parseInt(number),
        }),
        success: function (data) {
            getAllCustomers();
            alert("Saved Successfully!");
        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    })
}

function updateCustomer() {

    let id = $('#id').val();
    let name = $('#name').val();
    let address = $('#address').val();
    let number = $('#number').val();

    console.log(name);

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/customer/updateCustomer",
        async: true,
        data: JSON.stringify({
            "cusId": id,
            "cusName": name,
            "cusAddress": address,
            "cusPhone": parseInt(number),
        }),
        success: function (data) {
            getAllCustomers();
            alert("updated Successfully!");
        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    })
}

function deleteCustomer() {

    let id = $('#id').val();

    console.log(name);

    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/customer/deleteCustomer/"+id,
        async: true,
        success: function (data) {
            getAllCustomers();
            alert("Deleted Successfully!");
        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    })
}

function getAllCustomers() {

    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/customer/getAllCustomers",
        async: true,
        success: function (data) {
            if(data.code === 200){
                $('#customer-tbody').empty();

                for(let customer of data.data){
                    let id = customer.cusId;
                    let name = customer.cusName;
                    let address = customer.cusAddress;
                    let number = customer.cusPhone;

                    var row = `<tr class="customer-row"  data-id="${id}"
                                    data-name="${name}"
                                    data-address="${address}"
                                    data-number="${number}">
                                            
                                            <td>${id}</td>
                                            <td>${name}</td>
                                            <td>${address}</td>
                                            <td>${number}</td>
                                       </tr>`
                    $('#customer-tbody').append(row);
                }
            }
        }
    })
}
$('#customer-tbody').on('click', '.customer-row', function () {
    console.log("Row clicked!");  // මෙතන තියෙනවාද කියලා බලන්න

    let id = $(this).data('id');
    let name = $(this).data('name');
    let address = $(this).data('address');
    let number = $(this).data('number');

    console.log(id, name, address, number);  // දත්ත හරිම අරගෙන තියෙනවද බලන්න


    setCustomerData(id, name, address, number);
});

function setCustomerData(id, name, address, number) {
    console.log("Setting form data:", id, name, address, number);

    $('#id').val(id);
    $('#name').val(name);
    $('#address').val(address);
    $('#number').val(number);
}
const clearCustomeForm = () =>{
    $(`#id,#name,#address,#number`).val("");
}
$('#customer-clear').on('click', function () {
    clearCustomeForm();
});