getAllItems();
function saveItem(){
    let name = $('#itemName').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/item/saveItem",
        async: true,
        data: JSON.stringify({
            "itemCode": null,
            "itemName": name,
            "itemDescription": description,
            "itemPrice": price,
            "itemQty": qty,
        }),
        success: function (data) {
            getAllItems();
            alert("Saved Successfully!");
        },
        error:function (xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    })
}
function getAllItems(){
    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/item/getAllItems",
        async: true,
        success: function (data) {
            if(data.code === 200){
                $('.item-tbody').empty();

                for(let item of data.data){
                    let itemCode = item.itemCode;
                    let itemName = item.itemName;
                    let description = item.itemDescription;
                    let price = item.itemPrice;
                    let qty = item.itemQty;

                    var row=`<tr class="item-row"  data-item-code="${itemCode}" 
                                                           data-item-name="${itemName}"
                                                           data-description="${description}"
                                                           data-price="${price}"
                                                           data-qty="${qty}">
                                                           
                                                           <td>${itemCode}</td>
                                                           <td>${itemName}</td>
                                                           <td>${description}</td>
                                                           <td>${price}</td>
                                                           <td>${qty}</td>

                                                            </tr>`
                    $('.item-tbody').append(row);
                }
            }
        }
    })
}
$('.item-tbody').on('click', '.item-row', function () {
    let itemCode = $(this).data('itemCode');
    let itemName = $(this).data('itemName');
    let description = $(this).data('description');
    let price = $(this).data('price');
    let qty = $(this).data('qty');

    setData(itemCode, itemName, description, price,qty);
});

function setData(itemCode, itemName, description, price,qty) {
    console.log("Setting form data:", itemCode, itemName, description, price, qty);

    $('#itemCode').val(itemCode)
    $('#itemName').val(itemName);
     $('#description').val(description);
    $('#price').val(price);
     $('#qty').val(qty);
}
const clearItemForm = () =>{
    $(`#itemCode,#itemName,#description,#price,#qty`).val("");
}
$('#item-clear').on('click', function () {
    clearItemForm();
});

function updateItem() {

    let itemCode = $('#itemCode').val();
    let name = $('#itemName').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();

    console.log(name);
    console.log("Update itemCode:", itemCode); // check itemCode
    console.log("Update name:", name);

    if(!itemCode){
        alert("Item Code is required to update!");
        return;
    }

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/item/updateItem",
        async: true,
        data: JSON.stringify({
            "itemCode": itemCode,
            "itemName": name,
            "itemDescription": description,
            "itemPrice": price,
            "itemQty": qty,
        }),
        success: function (data) {
            getAllItems();
            alert("updated Successfully!");
        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    })
}
function deleteItem() {

    let itemCode = $('#itemCode').val();

    console.log(name);

    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/item/deleteItem/"+itemCode,
        async: true,
        success: function (data) {
            getAllItems();
            alert("Deleted Successfully!");
        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    })
}
