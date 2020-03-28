list = [{
        id: 1,
        'studentName': "Mostafa",
        'totalScore': 100
    },
    {
        id: 10,
        'studentName': "Omar",
        'totalScore': 90
    },
    {
        id: 23,
        'studentName': "Nour",
        'totalScore': 77
    },
    {
        id: 71,
        'studentName': "Ahmed",
        'totalScore': 86
    }
];

$(function () {

    // Update table content

    function updateTable(i) {
        $("#content").append(`
            <tr>
                <td>${i.id}</td>
                <td class="selected">${i.studentName}</td>
                <td>${i.totalScore}</td>
                <td>
                    <button class="btn btn-success">READ</button>
                    <button class="btn btn-primary">UPDATE</button>
                    <button class="btn btn-danger">DELETE</button>
                </td>
            </tr>
        `)
    }

    // Looping through list to update the table with its content

    $.map(list, function (item) {
        updateTable(item);
    });

    // Adding new content to the table through Create button

    $(".btn-info").on("click", function () {

        // Check if the entered ID was entered before 

        var c = 0;

        $.map(list, function (item) {
            if (item.id == $("#id").val()) {
                alert("This ID is already entered, Enter a different ID");
            } else {
                c++;
            }
        })

        if (c == list.length) {
            const newStudent = {
                id: $("#id").val(),
                'studentName': $("#student-name").val(),
                'totalScore': $("#total-score").val()
            };
            list.push(newStudent);
            updateTable(newStudent);
        }
    })
})

// Read Button

$("#content").on("click", ".btn-success", function () {
    $(this).attr("disabled", "disabled");
    var n = $(this).parent().parent().index();
    $("#content tr").eq(n).children().eq(1).addClass("read");
})

// Update Button

$("#content").on("click", ".btn-primary", function () {
    var index = $(this).parent().parent().index();
    $(this).parent().parent().html(`
        <td>
            <input class="form-control" value=${list[index].id}>
        </td>
        <td>
            <input class="form-control" value=${list[index].studentName}>
        </td>
        <td>
            <input class="form-control" value=${list[index].totalScore}>
        </td>
        <td>
            <button class="btn btn-secondary">SAVE</button>
        </td>
    `)
})

// Save Button

$("#content").on("click", ".btn-secondary", function () {
    var i = $(this).parent().parent().index();
    $(this).parent().parent().html(`
        <td>${$(this).parent().parent().children().eq(0).children().eq(0).val()}</td>
        <td class="selected">${$(this).parent().parent().children().eq(1).children().eq(0).val()}</td>
        <td>${$(this).parent().parent().children().eq(2).children().eq(0).val()}</td>
        <td>
            <button class="btn btn-success">READ</button>
            <button class="btn btn-primary">UPDATE</button>
            <button class="btn btn-danger">DELETE</button>
        </td>
    `);
})

// Delete Button 

$("#content").on("click", ".btn-danger", function () {
    var i = $(this).parent().parent().index();
    list.splice(i, 1);
    $(this).parent().parent().remove();
    //console.log(list);
})