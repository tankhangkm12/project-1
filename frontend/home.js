let API_ADD_STUDENT=''
let API_GET_STUDENT=''
let API_REMOVE_STUDENT=''
let API_ADD_CLASS=''
let API_GET_ALL_CLASS=''
let API_DELETE_CLASS=''
let API_GET_ALL_STUDENT_CLASS=''
let API_GET_ALL_TEACHERS=''
let API_ADD_TEACHER=''
let API_DELETE_TEACHER=''
let API_ADD_SUBJECT=''
let API_GET_SUBJECT=''
let API_DELETE_SUBJECT=''
let API_ADD_SCORE=''
let API_GET_SCORE=''
let API_DELETE_SCORE=''
let API_UPDATE_SCORE=''
let API_UPDATE_STUDENT=''
let API_UPDATE_CLASS=''
let API_UPDATE_TEACHER=''
let API_UPDATE_SUBJECT=''
function main(){
    // get id and load data 
    document.querySelector("#username").textContent =localStorage.getItem("username");
    get_id()
    document.addEventListener("DOMContentLoaded", function() {
        const defaultActiveItem = document.querySelector('.menu-item-student');
        if (defaultActiveItem) {
            defaultActiveItem.click();
        }
    });    
    // process menu items
    const menu_item=document.querySelectorAll('.menu-item')
    active_menuitem(menu_item)
    //assign event logout
    assign_logout_event()
    //assign event add student
    const button_add_student=document.querySelector('.main-add-student')
    event_add_student(button_add_student)
    //assign event add class
    const button_add_class=document.querySelector(".main-button-add-class")
    event_add_class(button_add_class)
    const button_add_teacher=document.querySelector(".main-teacher-add")
    event_add_teacher(button_add_teacher)
    //assign event add subject
    const button_add_subject=document.querySelector('.main-subject-add')
    event_add_subject(button_add_subject)
    //assign event add score
    close_button_event(document.querySelector(".close-score-button"))
    close_button_event(document.querySelector(".box-add-score-title-exit"))
    add_score()
    const save_button=document.querySelector(".save-score-button")
    event_save_student_score(save_button)
}
function get_id() {
    fetch("http://127.0.0.1:5000/get-ip")
    .then(response=>response.json())
    .then(ip_andress=>{
        API_ADD_STUDENT="http://"+ip_andress["ip"]+":5000/student/add-student"
        API_GET_STUDENT="http://"+ip_andress["ip"]+":5000/student/get-all-students"
        API_REMOVE_STUDENT="http://"+ip_andress["ip"]+":5000/student/remove-student"
        API_ADD_CLASS="http://"+ip_andress["ip"]+":5000/classes/add-class"
        API_GET_ALL_CLASS="http://"+ip_andress["ip"]+":5000/classes/get-all-classes"
        API_DELETE_CLASS="http://"+ip_andress["ip"]+":5000/classes/delete-class"
        API_GET_ALL_STUDENT_CLASS="http://"+ip_andress["ip"]+":5000/student/get_student_class"
        API_GET_ALL_TEACHERS="http://"+ip_andress["ip"]+":5000/teacher/get_all_teachers"
        API_ADD_TEACHER="http://"+ip_andress["ip"]+":5000/teacher/add-teacher"
        API_DELETE_TEACHER="http://"+ip_andress["ip"]+":5000/teacher/delete-teacher"
        API_ADD_SUBJECT="http://"+ip_andress["ip"]+":5000/subject/add-subject"
        API_GET_SUBJECT="http://"+ip_andress["ip"]+":5000/subject/get-all-subjects"
        API_DELETE_SUBJECT="http://"+ip_andress["ip"]+":5000/subject/delete-subject"
        API_ADD_SCORE="http://"+ip_andress["ip"]+":5000/score/add-score"
        API_GET_SCORE="http://"+ip_andress["ip"]+":5000/score/get-all-scores-subject"
        API_DELETE_SCORE="http://"+ip_andress["ip"]+":5000/score/delete-scores-student"
        API_UPDATE_SCORE="http://"+ip_andress["ip"]+":5000/score/update-scores-student"
        API_UPDATE_STUDENT="http://"+ip_andress["ip"]+":5000/student/update-student"
        API_UPDATE_CLASS="http://"+ip_andress["ip"]+":5000/classes/update-class"
        API_UPDATE_TEACHER="http://"+ip_andress["ip"]+":5000/teacher/update-teacher"
        API_UPDATE_SUBJECT="http://"+ip_andress["ip"]+":5000/subject/update-subject"
    })
    .then(function(){
        load_info_all_student(API_GET_STUDENT)
        load_info_class_list(API_GET_ALL_CLASS)
        load_class_management(API_GET_ALL_CLASS)
        load_teacher(API_GET_ALL_TEACHERS)
        load_subject(API_GET_SUBJECT)
        get_id_name_all_student_subject(API_GET_STUDENT).then(arrayInfoStudent=>{autocomplete(document.getElementById("score-id-student"),arrayInfoStudent,".score-name-student")}).catch(error=>{console.log(error.message)})
        get_id_name_all_student_subject(API_GET_SUBJECT).then(arrayInfoSubject=>{autocomplete(document.getElementById("score-id-subject"),arrayInfoSubject,".score-name-subject")}).catch(error=>{console.log(error.message)})
        load_score(API_GET_SCORE)
    })
    .catch(error=>console.error("error" + error.message))
}
function check_content_type(){
    fetch(API_GET_STUDENT)
    .then(response => {
    //Kiểm tra Content-Type của phản hồi
        const contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("text/html") !== -1) {
    //Nếu Content-Type là text/html, trả về phản hồi dưới dạng text
        return response.text();
        } else {
        throw new TypeError("Oops, we haven't got HTML!");
        }
    })
    .then(html => {
    //In nội dung HTML ra console
        console.log(html);
    })
    .catch(error => console.log(error));
}
function fetchsave(tbody,API,data,load,API_load){
    fetch(API,{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(data)})
       .then(response=>{
            if (response.status===200)
                {
                    console.log("Successfully added!")
                    tbody.querySelectorAll("tr").forEach(row=>{
                        row.remove();
                    })
                    load(API_load)
                }
                else{
                    return response.json().then(dataError=>{alert(dataError.message)});
                }
        })
       .catch(error=>{
            console.error("Error"+error.message)
        })
}
function fetchremove(API,data={}){
    fetch(API,{method:"DELETE",
        headers:{"Content-Type": "application/json"},body:JSON.stringify(data)})
       .then(response=>{
        if (response.status===200)
                {
                    console.log("Successfully removed!")
                    
                }
                else{
                    console.log("Failed removed!")
                }
        })
       .catch(error=>{
        console.error("Error"+error.message)
    })
}
function fetchUpdate(API,data,load_function,API_LOAD,tbody){
    fetch(API,{method:"PUT",headers:{"Content-Type": "application/json"},body:JSON.stringify(data)})
       .then(response=>{
        if (response.status===200)
                {
                    console.log("Successfully updated!")
                    tbody.querySelectorAll("tr").forEach(row=>{
                        row.remove();
                    })
                    load_function(API_LOAD)
                    
                }
                else{
                    response.json().then(response=>{alert(response.message)})
                }
        })
       .catch(error=>{
            console.log(error.message)
    })
}
function searchBar(searchInput,tbody,classvalue1,classvalue2,classvalue3){
    console.log("Searching...")
    searchInput.addEventListener("input",e=>{
        const filter=e.target.value.toLowerCase().trim()
        const rows=tbody.querySelectorAll('tr')
        rows.forEach(row=>{
            const value1=row.querySelector(classvalue1).textContent.toLowerCase()
            const value2=row.querySelector(classvalue2).textContent.toLowerCase()
            const value3=row.querySelector(classvalue3).textContent.toLowerCase()
            if(value1.includes(filter) || value2.includes(filter) || value3.includes(filter))
                row.style.display=''
            else
                row.style.display='none'
        })
    })
}
function load_info_all_student(API)
{
    fetch(API)
    .then(response=>{
        if (!response.ok){
            throw new Error(response.statusText)
        }
        console.log(response)
        console.log(response.headers.get("content-Type"))
        if (!response.headers.get("content-Type").includes("application/json")){
            throw new Error("Received is not JSON", response.statusText)
        }
        return response.json()
    })
    .then(data=>{
        data.forEach(student=>{
            const tbody=document.querySelector('#studentTableBody')
            const row=document.createElement('tr')
            row.innerHTML=
            `
                <td class="student-id">${student["id"]}</td>
                <td class="student-name">${student["name"]}</td>
                <td class="student-class">${student["class"]}</td>
                <td class="student-grade">${student["grade"]}</td>
                <td class="student-birthday">${student["birthday"]}</td>
                <td class="student-gender">${student["gender"]}</td>
                <td class="student-address">${student["address"]}</td>
                <td class="student-school_year">${student["school_year"]}</td>
                <td>
                    <i class="fa-solid fa-edit main-student-table-option-edit"></i>
                    <i class="fa-solid fa-trash main-student-table-option-delete"></i>
                </td>
            `
            tbody.appendChild(row)
            const searchInput=document.querySelector("#main-search")
            searchBar(searchInput,tbody,".student-id",".student-name",".student-id")
            row.querySelector(".main-student-table-option-delete").addEventListener("click", e=>{
                const id=e.target.closest("tr").querySelector(".student-id").textContent;
                const data={"id":id}
                fetchremove(API_REMOVE_STUDENT,data)
                e.target.closest("tr").remove();
            })
            updateStudent(row,student,API,tbody)
        })
    })
    .catch(error=>console.log("error: " + error.message))
}

function updateStudent(row,student,API,tbody){
    row.querySelector(".main-student-table-option-edit").addEventListener("click",function(){
        row.innerHTML =`<td><input type="text" class="input_table-infor-student input-id-student" value="${student["id"]}" disabled></td>
        <td><input type="text" class="input_table-infor-student input-name-student" value="${student["name"]}"></td>
        <td><input class="input_table-infor-student input-class-student" value="${student["class"]}"></td>
        <td><input type="text" class="input_table-infor-student input-grade-student" value="${student["grade"]}"></td>
        <td><input type="text" class="input_table-infor-student input-birthday-student" value="${student["birthday"]}"></td>
        <td><input type="text" class="input_table-infor-student input-gender-student" value="${student["gender"]}"></td>
        <td><input type="text" class="input_table-infor-student input-andress-student" value="${student["address"]}"></td>
        <td><input type="text" class="input_table-infor-student input-year_school-student" value="${student["school_year"]}"></td>
        <td>
            <i class="fa-solid fa-check main-student-table-option-save"></i>
            <i class="fa-solid fa-x main-student-table-option-cancel"></i>
        </td>`

        row.querySelector(".main-student-table-option-save").addEventListener("click",e=>{
            const id=row.querySelector(".input-id-student").value;
            const name=row.querySelector(".input-name-student").value;
            const class_student=row.querySelector(".input-class-student").value;
            const grade=row.querySelector(".input-grade-student").value;
            const birthday=row.querySelector(".input-birthday-student").value;
            const gender=row.querySelector(".input-gender-student").value;
            const andress=row.querySelector(".input-andress-student").value;
            const year_school=row.querySelector(".input-year_school-student").value;
            const student={
                "id":id,
                "name":name,
                "class_student":class_student,
                "grade":grade,
                "birthday":birthday,
                "gender":gender,
                "andress":andress,
                "year_school":year_school
            }
            fetchUpdate(API_UPDATE_STUDENT,student,load_info_all_student,API,tbody)
        })
    })
}
function cancel_button(row,name_class){
    row.querySelector(`.${name_class}`).addEventListener("click",e=>{
            const row=e.target.closest("tr")
            row.remove()
        })
}
function active_menuitem(menu_item){
    menu_item.forEach(item=>{
        item.addEventListener('click',function(){
            const isActive=this.classList.contains('active');
            if (!isActive) {
                menu_item.forEach(item=>{item.classList.remove('active')});
            }
            this.classList.toggle('active');
            document.querySelectorAll(".main").forEach(page=>
                {
                    page.style.display="none"
                }
            )
            const id_target=this.getAttribute("data-target")
            if (document.getElementById(id_target)){
                if (this.classList.contains("active")){
                    document.getElementById(id_target).style.display="block"
                }
                else {
                    document.getElementById(id_target).style.display="none"
                }
            }      
        })
    })
}
function assign_logout_event(){
    document.querySelector('.logout').addEventListener('click',e=>{
        window.location.href="login.html"
    })
}
function save_student(row){
    const tbody=document.querySelector('#studentTableBody')
    row.querySelector(".main-student-table-option-save").addEventListener('click',e=> {
        const id=row.querySelector(".input-id-student").value;
        const name=row.querySelector(".input-name-student").value;
        const class_student=row.querySelector(".input-class-student").value;
        const grade=row.querySelector(".input-grade-student").value;
        const birthday=row.querySelector(".input-birthday-student").value;
        const gender=row.querySelector(".input-gender-student").value;
        const andress=row.querySelector(".input-andress-student").value;
        const year_school=row.querySelector(".input-year_school-student").value;
        const student={
            "id":id,
            "name":name,
            "class_student":class_student,
            "grade":grade,
            "birthday":birthday,
            "gender":gender,
            "andress":andress,
            "year_school":year_school
        }
        fetchsave(tbody,API_ADD_STUDENT,student,load_info_all_student,API_GET_STUDENT)
    })
}
function event_add_student(button_add_student){
    button_add_student.addEventListener('click', e=>{
        const tbody=document.querySelector('#studentTableBody')
        const row=document.createElement('tr')
        row.innerHTML=
        `
            <td><input type="text" class="input_table-infor-student input-id-student"></td>
            <td><input type="text" class="input_table-infor-student input-name-student"></td>
            <td><input class="input_table-infor-student input-class-student"></td>
            <td><input type="text" class="input_table-infor-student input-grade-student"></td>
            <td><input type="text" class="input_table-infor-student input-birthday-student"></td>
            <td><input type="text" class="input_table-infor-student input-gender-student"></td>
            <td><input type="text" class="input_table-infor-student input-andress-student"></td>
            <td><input type="text" class="input_table-infor-student input-year_school-student"></td>
            <td>
                <i class="fa-solid fa-check main-student-table-option-save"></i>
                <i class="fa-solid fa-x main-student-table-option-cancel"></i>
            </td>
        `   
        tbody.appendChild(row)
        cancel_button(row,"main-student-table-option-cancel")
        save_student(row)
    })    
}
function save_class(row){
    const tbody=document.querySelector("#classTableBody")
    row.querySelector(".main-class-list-table-option-save").addEventListener("click", e =>{
        const row=e.target.closest("tr")
        let class_infor={
            "name-class":row.querySelector(".input-name-class").value,
            "number-student-class":row.querySelector(".input-number-student-class").value,
            "teacher-class":row.querySelector(".input-teacher-class").value
        }
        fetchsave(tbody,API_ADD_CLASS,class_infor,load_info_class_list,API_GET_ALL_CLASS)
    })
}
function event_add_class(button_add_class){
    button_add_class.addEventListener("click",function(){
        const tbody=document.querySelector("#classTableBody")
        const row=document.createElement("tr")
        row.innerHTML=`
            <td><input type="text" class="input_table-infor-class input-name-class"></td>
            <td><input type="text" class="input_table-infor-class input-number-student-class"></td>
            <td><input type="text" class="input_table-infor-class input-teacher-class"></td> 
            <td>
                <i class="fa-solid fa-check main-class-list-table-option-save"></i>
                <i class="fa-solid fa-x main-class-list-table-option-cancel"></i>
            </td>
    `
        tbody.appendChild(row)
        cancel_button(row,"main-class-list-table-option-cancel")
        save_class(row)
    })
}
function load_info_class_list(API){
    const tbody=document.querySelector("#classTableBody")
    fetch(API)
    .then(response =>response.json())
    .then(datas=>{
        datas.forEach(data=>{
            const row=document.createElement("tr")
            row.innerHTML=`
                <td class="name-class"> ${data["name-class"]}</td>
                <td class="number-student-class">${data["number-student-class"]}</td>
                <td class="teacher-class">${data["teacher-class"]}</td>
                <td>
                    <i class="fa-solid fa-edit main-class-list-table-option-edit"></i>
                    <i class="fa-solid fa-trash main-class-list-table-option-delete"></i>
                </td>
            `
            tbody.appendChild(row);
            const searchInput=document.querySelector("#main-search-classList")
            searchBar(searchInput,tbody,".name-class",".teacher-class",".teacher-class")
            row.querySelector(".main-class-list-table-option-delete").addEventListener("click", e=>{
                    const curentRow = e.target.closest("tr")
                    const name=curentRow.querySelector(".name-class").textContent;
                    const data={"name-class":name}
                    fetchremove(API_DELETE_CLASS,data)
                    curentRow.remove()
                })
            updateClassList(row,data,API,tbody)
        })
    })
    .catch(error => console.log(error.message));
}
function updateClassList(row,data,API,tbody){
    row.querySelector('.main-class-list-table-option-edit').addEventListener('click',e=>{
        row.innerHTML=`
            <td><input type="text" class="input_table-infor-class input-name-class" value="${data["name-class"]}" disabled></td>
            <td><input type="text" class="input_table-infor-class input-number-student-class" value="${data["number-student-class"]}" disabled></td>
            <td><input type="text" class="input_table-infor-class input-teacher-class" value="${data["id-teacher"]}"></td> 
            <td>
                <i class="fa-solid fa-check main-class-list-table-option-save"></i>
                <i class="fa-solid fa-x main-class-list-table-option-cancel"></i>
            </td>
    `
        row.querySelector(".main-class-list-table-option-save").addEventListener("click",e=>{
            const row=e.target.closest("tr")
            let class_infor={
            "name-class":row.querySelector(".input-name-class").value,
            "number-student-class":row.querySelector(".input-number-student-class").value,
            "teacher-class":row.querySelector(".input-teacher-class").value
            }
            fetchUpdate(API_UPDATE_CLASS,class_infor,load_info_class_list,API,tbody)
        })
    })
}
function load_class_management(API){
    const body=document.querySelector(".main-class-management-body")
    fetch(API)
        .then(response=>response.json())
        .then(datas=>{
            datas.forEach(data=>{
                const box_class=document.createElement("div")
                box_class.classList.add("main-class-information-box")
                box_class.innerHTML=`
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-7n4v-hResXA7FCR0ht_zfOt9yxeLg77G2g&s" class="image-class-management">
                    <div class="main-class-information-text">
                        <p class="main-class-information-text main-class-information-text-name">Tên lớp : ${data["name-class"]}</p>
                        <p class="main-class-information-text main-class-information-text-id">Giáo viên: ${data["teacher-class"]}</p>
                    </div>
                `
                body.appendChild(box_class)
                box_class.addEventListener('click',e=>{
                    const menu_active_click=document.querySelector(".menu-management")
                    menu_active_click.id="menu-item-enable"
                    const main_box=document.querySelector("#main-class-management")
                    main_box.style.display="none"
                    const main_body_student_class=document.createElement("div")
                    main_body_student_class.classList.add("main-body-student-class")
                    const container_box=document.querySelector(".container")
                    main_body_student_class.innerHTML=` 
                        <div class="main-body-student-class-header">
                            <div class="return-class-page">
                                <i class="fa-solid fa-arrow-up-from-bracket return-angle-right"></i>
                                <p class="return-main-title-class-management">Quay Lại</p>    
                            </div>
                            <div class="main-body-student-class-header-menu">
                                <i class="fa-solid fa-bars menu-title-infor-class"></i>
                                <p class="main-body-student-class-header-menu-text">Thông tin</p>
                            </div>
                             <div class="main-class-header-title-heading">
                                <i class="fa-solid fa-arrow-right heading-class-arrow-left"></i>
                                <p class="main-class-heading-title-text">Danh sách sinh viên lớp ${data["name-class"]}</p>
                                <i class="fa-solid fa-arrow-right heading-class-arrow-right"></i>
                            </div>
                            <div class="overlay-info-class">
                                <div class="overlay-infor-class-show">
                                    <p>Tên lớp: ${data["name-class"]} </p>
                                    <p>Số lượng học sinh: ${data["number-student-class"]} </p>
                                    <p>Giáo viên chủ nhiệm : ${data["name-teacher"]} </p>
                                </div>
                            </div>
                        </div>
                        <div class="main-body-student-class-body">
                            <div class="main-body-student-class-body-box">

                            </div>
                        </div>
                    `

                    main_body_student_class.querySelector('.main-body-student-class-header-menu').addEventListener('click',e=>{
                        main_body_student_class.querySelector(".overlay-info-class").style.display="flex"
                    })

                    main_body_student_class.querySelector('.overlay-info-class').addEventListener('click', e=>{
                        main_body_student_class.querySelector('.overlay-info-class').style.display="none";
                    })
                    container_box.appendChild(main_body_student_class)
                    fetch(`${API_GET_ALL_STUDENT_CLASS}/${data["name-class"]}`) 
                        .then(response => response.json())
                        .then(datas=>{datas.forEach(data=>{
                            if (data){
                                let id=data["id"]
                                let name=data["name"]
                                let gender=data["gender"]
                                let address=data["address"]
                                let birthday=data["birthday"]
                                const main_body=document.querySelector(".main-body-student-class-body-box")
                                if (main_body) {
                                    const box_student_info=document.createElement("div")
                                    box_student_info.classList.add("box-student-infor")
                                    box_student_info.innerHTML=`
                                    <img class="box-student-infor-img" src="${(gender.toLowerCase())==="nam"?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpcLImZmDFguXEPBwtRsIKdCFv9ip-lew1tA&s":"https://media.istockphoto.com/id/606210662/vector/young-happy-student-girl-vector-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=SWbiQ1I010OpZa4A684JbeCCrB0GgptGjm1DUvRmk6o="}">
                                    <div class="box-student-infor-text">
                                        <p>ID : ${id}</p>
                                        <p>Họ và Tên : ${name}</p>
                                        <p>Giới tính : ${gender}</p>
                                        <p>Địa chỉ : ${address}</p>
                                        <p>Ngày sinh : ${birthday}</p>    
                                    </div>
                                    `
                                main_body.appendChild(box_student_info)
                                }
                            }
                        })
                    })
                        .catch(error=>{
                            console.log(error.message)
                        })
                        
                        main_body_student_class.querySelector(".return-class-page").addEventListener("click",e=>{
                            menu_active_click.id=""
                            main_box.style.display = "inline-block";
                            main_body_student_class.remove();
                        })
                })
            })
        })
        .catch(error=> {
            console.log(error.message)
        })
    document.querySelector(".search-class").addEventListener("input",e=>{
            const data_search=e.target.value.toLowerCase()
            const box_class=document.querySelectorAll(".main-class-information-box")
            box_class.forEach(box=>{
                const data_id=box.querySelector(".main-class-information-text-id").textContent.toLowerCase()
                const data_name=box.querySelector(".main-class-information-text-name").textContent.toLowerCase()
                if (data_search!=="" && data_id.indexOf(data_search)===-1 && data_name.indexOf(data_search)===-1)
                {
                    box.style.display="none"
                }
                else{
                    box.style.display="inline-block"
                }
            })  
        })
}
function save_teacher(row){
    const tbody=document.querySelector("#teacherTableBody")
    row.querySelector(".main-teacher-table-option-save").addEventListener("click",e=>{
        let id=row.querySelector(".input-id-teacher").value;
        let name=row.querySelector(".input-name-teacher").value;
        let subject=row.querySelector(".input-subject-teacher").value;
        let teacher={
            "id":id,
            "name":name,
            "subject":subject
        }
        fetchsave(tbody,API_ADD_TEACHER,teacher,load_teacher,API_GET_ALL_TEACHERS)
    })
}
function event_add_teacher(button_add_teacher){
    button_add_teacher.addEventListener("click",e=>{
        const tbody=document.querySelector("#teacherTableBody")
        const row=document.createElement("tr")
        row.innerHTML=`
            <td><input type="text" class="input_table-infor-teacher input-id-teacher"></td>
            <td><input type="text" class="input_table-infor-teacher input-name-teacher"></td>
            <td><input type="text" class="input_table-infor-teacher input-subject-teacher"></td> 
            <td>
                <i class="fa-solid fa-check main-teacher-table-option-save"></i>
                <i class="fa-solid fa-x main-teacher-table-option-cancel"></i>
            </td>
        `
    
        tbody.appendChild(row);
        cancel_button(row,"main-teacher-table-option-cancel")
        save_teacher(row)
    })
}
function load_teacher(API){
    const tbody=document.querySelector("#teacherTableBody")
    fetch(API)
       .then(response => response.json())
       .then(datas=>{datas.forEach(data=>{
            if (data){
                let id=data["id"]
                let name=data["name"]
                let subject=data["subject"]
                const row=document.createElement("tr")
                row.innerHTML=`
                    <td class="teacher-id">${id}</td>
                    <td class="teacher-name">${name}</td>
                    <td class="teacher-subject">${subject}</td> 
                    <td>
                        <i class="fa-solid fa-edit main-teacher-table-option-edit"></i>
                        <i class="fa-solid fa-trash main-teacher-table-option-remove"></i>
                    </td>
                `
                tbody.appendChild(row);
                const searchInput=document.querySelector("#main-search-teacher")
                searchBar(searchInput,tbody,".teacher-id",".teacher-name",".teacher-subject")
                row.querySelector(".main-teacher-table-option-remove").addEventListener("click", e=>{
                    const curentRow = e.target.closest("tr")
                    const id=curentRow.querySelector(".teacher-id").textContent.trim();
                    fetchremove(`${API_DELETE_TEACHER}/${id}`)
                    curentRow.remove()
                })
                updateTeacher(row,data,API,tbody)
            }
        })
    })
       .catch(error=> {
            console.log(error.message)
        })
}
function updateTeacher(row,teacher,API,tbody){
    row.querySelector(".main-teacher-table-option-edit").addEventListener("click",function(){
        row.innerHTML=`
            <td><input type="text" class="input_table-infor-teacher input-id-teacher" value="${teacher["id"]}" disabled></td>
            <td><input type="text" class="input_table-infor-teacher input-name-teacher" value="${teacher["name"]}"></td>
            <td><input type="text" class="input_table-infor-teacher input-subject-teacher" value="${teacher["subject"]}"></td> 
            <td>
                <i class="fa-solid fa-check main-teacher-table-option-save"></i>
                <i class="fa-solid fa-x main-teacher-table-option-cancel"></i>
            </td>
        `
        row.querySelector(".main-teacher-table-option-save").addEventListener("click", e=>{
            let id=row.querySelector(".input-id-teacher").value;
            let name=row.querySelector(".input-name-teacher").value;
            let subject=row.querySelector(".input-subject-teacher").value;
            let teacher={
                "id":id,
                "name":name,
                "subject":subject
            }
            fetchUpdate(API_UPDATE_TEACHER,teacher,load_teacher,API,tbody)
        })
    })
}
function save_subject(row){
    const tbody=document.querySelector('#subjectTableBody')
    row.querySelector('.main-subject-table-option-save').addEventListener('click', () =>{
        const id=document.querySelector('.input-id-subject').value;
        const name=document.querySelector('.input-name-subject').value
        const teacher=document.querySelector('.input-teacher-subject').value;
        const data={
            "id": id,
            "name": name,
            "teacher": teacher
        }
        fetchsave(tbody,API_ADD_SUBJECT,data,load_subject,API_GET_SUBJECT)
    })
}
function event_add_subject(button_add_subject){
    button_add_subject.addEventListener("click",e=>{
        const tbody=document.querySelector('#subjectTableBody');
        const row=document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" class="input_table-infor-subject input-id-subject"></td>
            <td><input type="text" class="input_table-infor-subject input-name-subject"></td>
            <td><input type="text" class="input_table-infor-subject input-teacher-subject"></td> 
            <td>
                <i class="fa-solid fa-check main-subject-table-option-save"></i>
                <i class="fa-solid fa-x main-subject-table-option-cancel"></i>
            </td>
        `
        tbody.appendChild(row)
        cancel_button(row,"main-subject-table-option-cancel")
        save_subject(row)
    })
}
function load_subject(API){
    fetch(API)
    .then(response => response.json())
    .then(datas=>{
        const tbody=document.querySelector('#subjectTableBody');
        datas.forEach(data=>{
            if (data){
                const id=data['id'];
                const name=data['name'];
                const teacher=data['teacher'];
                const row=document.createElement('tr');
                row.innerHTML = `
                    <td class="subject-id">${id}</td>
                    <td class="subject-name">${name}</td>
                    <td class="subject-teacher">${teacher}</td>
                    <td>
                        <i class="fa-solid fa-edit main-subject-table-option-edit"></i>
                        <i class="fa-solid fa-trash main-subject-table-option-remove"></i>
                    </td>
                `
                tbody.appendChild(row);
                const searchInput=document.querySelector("#main-search-subject")
                searchBar(searchInput,tbody,".subject-id",".subject-name",".subject-teacher")
                row.querySelector(".main-subject-table-option-remove").addEventListener("click", e=>{
                    const curentRow = e.target.closest("tr")
                    const id=curentRow.querySelector(".subject-id").textContent.trim();
                    fetchremove(`${API_DELETE_SUBJECT}/${id}`)
                    curentRow.remove()
                })
                updateSubject(row,data,API,tbody)
            }
            else{
                console.log("No data found")
            }
        })
    })
    .catch(err=>{
        console.log("Error!"+err.message)
    })
}
function updateSubject(row,subject,API,tbody){
    row.querySelector(".main-subject-table-option-edit").addEventListener("click",e=>{
        row.innerHTML = `
            <td><input type="text" class="input_table-infor-subject input-id-subject" value="${subject["id"]}" disabled></td>
            <td><input type="text" class="input_table-infor-subject input-name-subject" value="${subject["name"]}" disabled></td>
            <td><input type="text" class="input_table-infor-subject input-teacher-subject" value="${subject["id-teacher"]}"></td> 
            <td>
                <i class="fa-solid fa-check main-subject-table-option-save"></i>
                <i class="fa-solid fa-x main-subject-table-option-cancel"></i>
            </td>
        `
        row.querySelector('.main-subject-table-option-save').addEventListener('click',function(){
            const id=document.querySelector('.input-id-subject').value;
            const name=document.querySelector('.input-name-subject').value
            const teacher=document.querySelector('.input-teacher-subject').value;
            const data={
                "id": id,
                "name": name,
                "teacher": teacher
            }
            fetchUpdate(API_UPDATE_SUBJECT,data,load_subject,API,tbody)
        })
    })
}
function close_button_event(close_button){
    close_button.addEventListener("click", function(e){
        document.querySelector("#score-id-student").value=""
        document.querySelector(".score-name-student").textContent=""
        document.querySelector("#score-id-subject").value=""
        document.querySelector(".score-name-subject").textContent=""
        document.querySelector("#score-1").value=""
        document.querySelector("#score-2").value=""
        document.querySelector("#score-3").value=""
        document.querySelector("#score-4").value=""
        document.querySelector(".main-score-coating").style.display="none";
    })
}
function autocomplete(input,arrInfo,className){
    let arrayid=Object.keys(arrInfo)
    input.addEventListener("input",function(e){
        let a,b,val=this.value.trim();
        closeAllLists()
        if (!val){
            return false;
        }
        a=document.createElement("div")
        a.setAttribute("id","autocomplete-list")
        a.setAttribute("class","autocomplete-container")
        this.parentNode.appendChild(a)
        for (let i=0;i<arrayid.length;i++){
            if (arrayid[i].substring(0,val.length).toUpperCase()==val.toUpperCase()){
                b=document.createElement("div")
                b.setAttribute("class","autocomplete-item")
                b.innerHTML = "<strong>" + arrayid[i].substring(0, val.length) + "</strong>";
                b.innerHTML += arrayid[i].substring(val.length);
                b.innerHTML += "<input type='hidden' value='" + arrayid[i]+ "'>";
                b.addEventListener("click",function(e){
                    input.value=this.getElementsByTagName("input")[0].value;
                    (document.querySelector(className)).textContent=arrInfo[this.getElementsByTagName("input")[0].value];
                    closeAllLists() 
                })
                a.appendChild(b)
            }
        }
    })
    function closeAllLists(elmnt){
        let items=document.querySelectorAll(".autocomplete-container")
        items.forEach(item=>{
            if (elmnt != item && elmnt != input){
                item.parentNode.removeChild(item)
            }
        })
               
    }
    
}

function add_score(){
    document.querySelector(".main-button-add-score").addEventListener("click",e=>{
        document.querySelector("#score-id-student").disabled = false;
        document.querySelector("#score-id-student").style.backgroundColor = "white";
        document.querySelector("#score-id-subject").disabled = false;
        document.querySelector("#score-id-subject").style.backgroundColor = "white";
        document.querySelector(".main-score-coating").style.display = "block"
        document.querySelector(".save-score-button").style.display = "flex"
        document.querySelector(".update-score-button").style.display = "none"
    })
}

async function get_id_name_all_student_subject(API){
    const arrInfo={}
    try{
        const response= await fetch(API);
        if (!response.ok){
            throw new Error('Network response was not ok')
        }
        const contentType=response.headers.get('content-type');
        console.log(contentType)
        if (contentType && contentType.includes('application/json')){
            const datas=await response.json();
            datas.forEach(data=>{
                arrInfo[data["id"]]=data["name"]
            })
        }
        else {
            throw new Error("Error fetch data")
        }
        return arrInfo
    }
    catch(err){
        console.error(err.message)
        return {}
    }
}
function get_info_score(){
    const student_id=document.querySelector("#score-id-student").value
    const student_name=document.querySelector(".score-name-student").textContent
    const subject_id=document.querySelector("#score-id-subject").value
    const subject_name=document.querySelector(".score-name-subject").textContent
    const score_1=parseFloat(document.querySelector("#score-1").value)
    const score_2=parseFloat(document.querySelector("#score-2").value)
    const score_3=parseFloat(document.querySelector("#score-3").value)
    const score_4=parseFloat(document.querySelector("#score-4").value)
    const scores=[score_1,score_2,score_3,score_4]
    if (scores.some(isNaN)){
        alert("Vui Lòng Nhập Đủ Số Điểm!")  
        return false
    }
    for (let i=0; i<scores.length; i++){
        if (scores[i]<0 || scores[i]>10){
            alert("Vui Lòng Nhập Số Điểm Từ 0 đến 10!")
            return false
        }
    }
    const average=(score_1+score_2+score_3+score_4)/4
    const data={
        "id-student": student_id,
        "name": student_name,
        "id-subject": subject_id,
        "subject": subject_name,
        "score-1": score_1,
        "score-2": score_2,
        "score-3": score_3,
        "score-4": score_4,
        "average-score": average
    }
    return data
}
function savebuttonscore(){
    const data=get_info_score()
    if (data===false){
        return false
    }
    alert("Lưu Thành Công")
    fetchsave(null,API_ADD_SCORE,data,null,null)
    document.querySelector("#scoreTableBody").querySelectorAll("tr").forEach(row=>{
        row.remove()
    })
    load_score(API_GET_SCORE)
    document.querySelector(".close-score-button").click()

}
function event_save_student_score(button_save_score){
    button_save_score.onclick=savebuttonscore
}
function load_score(API){
    get_id_name_all_student_subject(API_GET_SUBJECT).then(response=>{
        const id_list=Object.keys(response)
        console.log(id_list)
        id_list.forEach(id=>{
            fetch(`${API}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(datas=>{datas.forEach(data=>{
                    console.log(data)
                    const tbody=document.querySelector("#scoreTableBody")
                    const row=document.createElement("tr")
                    row.innerHTML=`
                        <td class="id-student-score">${data["id-student"]}</td>
                        <td class="name-student-score">${data["name"]}</td>
                        <td class="name-subject-score">${data["subject"]}</td>
                        <td class="average-score">${data["average-score"]}</td>
                        <td>
                            <i class="fa-solid fa-edit score-table-option-edit"></i>
                            <i class="fa-solid fa-trash score-table-option-delete"></i>
                        </td>
                    `
                    tbody.appendChild(row)
                    row.querySelector(".score-table-option-delete").addEventListener("click",e=>{
                        fetchremove(`${API_DELETE_SCORE}/${data["id-subject"]}/${data["id-student"]}`,null)
                        row.remove()
                    })

                    row.querySelector(".score-table-option-edit").addEventListener("click",e=>{
                        document.querySelector(".update-score-button").style.display="flex"
                        document.querySelector(".save-score-button").style.display="none"
                        document.querySelector(".main-score-coating").style.display="block"
                        document.querySelector(".box-add-score-title-text").textContent = "Chỉnh sửa điểm"
                        document.querySelector(".close-score-text").textContent = "Hủy"
                        document.querySelector("#score-id-student").value=data["id-student"]
                        document.querySelector(".score-name-student").textContent=data["name"]
                        document.querySelector("#score-id-subject").value=data["id-subject"]
                        document.querySelector(".score-name-subject").textContent=data["subject"]
                        document.querySelector("#score-1").value=parseFloat(data["score-1"])
                        document.querySelector("#score-2").value=parseFloat(data["score-2"])
                        document.querySelector("#score-3").value=parseFloat(data["score-3"])
                        document.querySelector("#score-4").value=parseFloat(data["score-4"])
                        document.querySelector("#score-id-student").disabled=true
                        document.querySelector("#score-id-student").style.backgroundColor="rgba(220, 218, 218,0.5)"
                        document.querySelector("#score-id-subject").disabled=true
                        document.querySelector("#score-id-subject").style.backgroundColor="rgba(220, 218, 218,0.5)"
                        document.querySelector(".update-score-button").onclick=function(){
                            data=get_info_score()
                            if (data===false){
                                return false
                            }
                            fetchUpdate(API_UPDATE_SCORE,data)
                            row.querySelector(".average-score").textContent=data["average-score"]
                            document.querySelector(".close-score-button").click()
                        }
                    })
                })
            })
            .catch(error=>{
                console.error(error.message)
            })
        })
    })
    let tbody=document.querySelector("#scoreTableBody")
    let searchInput=document.querySelector(".search-score")
    searchBar(searchInput,tbody,".id-student-score",".name-student-score",".name-subject-score")
}
function event_add_score(){
    close_button_event(document.querySelector(".close-score-button"))
    close_button_event(document.querySelector(".box-add-score-title-exit"))
    add_score()
    const save_button=document.querySelector(".save-score-button")
    event_save_student_score(save_button)
}

main()
