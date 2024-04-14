import { shared1Function1 } from './../Shared/Shared1'


function init() {
    console.log("controller home")

    let test = $("#test").addClass("jquery-test-01");
    console.log(test)
    shared1Function1();
}

init();