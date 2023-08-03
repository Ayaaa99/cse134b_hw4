/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advwalkBtn');
    element.addEventListener('click', function(){
        advwalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advmodifyBtn');
    element.addEventListener('click', function () {
        advmodify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById("addeleBtn");
    element.addEventListener('click', function () {
        addele();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safedelBtn');
    element.addEventListener('click', function () {
        safedelete();
    });

    element = document.getElementById('slcdelBtn');
    element.addEventListener('click', function () {
        slcdelete();
    });
}

function walk() {
   document.getElementById('wlkresult').innerHTML='';
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    const output = document.getElementById('wlkresult');
    output.innerHTML += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`+ "&#10&#13";
}

function advwalk() {
    const output = document.getElementById('advwlkresult');
    output.innerHTML = '';
    const para = document.querySelector('html');
    output.innerHTML += `${para.nodeName}\n`;
    let childNodes = para.childNodes;
    output.innerHTML += printChilds(childNodes, '|');
}

function printChilds(childNodes, prepend){
    var childresult = '';
    for (let i = 0; i < childNodes.length; i++){
        let child = childNodes[i];
        childresult += prepend + `-- ${child.nodeName}\n`;
        childresult += printChilds(child.childNodes, prepend+'|');
    }
    return childresult;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advmodify() {
    let el = document.querySelector('h1');
    el.innerHTML = "DOM Manipulation is Fun!";
    let colornum = (Math.floor(Math.random() * 6)).toString();
    el.style.color = `var(--color${colornum})`;
    el = document.getElementById('p1');
    el.classList.add("shmancy");
}   

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!

}

function addele() {
    const type = document.getElementById("elements").value;
    const out = document.querySelector('output');
    if (type == 'textnode'){
        let text = 'New Text Node';
        let input = document.getElementById('addcontent').value;
        if (input != ''){
            text = input;
        }
        out.innerHTML += `<p>${text}</p>`;
    }
    if (type == 'comment'){
        let comment = 'New Comment';
        let input = document.getElementById('addcontent').value;
        if (input != ''){
            comment = input;
        }
        out.innerHTML += `<!--${comment}-->`;
    }
    if (type == 'element'){
        let content = 'New Element';
        let tag = 'p';
        let input1 = document.getElementById('addcontent').value;
        if (input1 != ''){
            content = input1;
        }
        let input2 = document.getElementById('addtag').value;
        if (input2 != ''){
            tag = input2;
        }
        out.innerHTML += `<${tag}>${content}</${tag}>`;
    }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safedelete() {
    const el = document.querySelector('body');
    findform(el);
}

function findform(el) {
    while(el){
        if(el.nodeName == 'FORM'){
            break;
        }else if (el.childNodes.length != 0) {
            el = el.firstChild;
            continue;
        }else{
            let parent = el.parentNode;
            parent.removeChild(el);
            el = parent;
            continue;
        }
    }

    let para = el.parentNode.parentNode;
    const delnum = para.childNodes.length-1;
    for (let i = 0; i<delnum; i++){
        para.removeChild(para.lastChild);
    }

}

function slcdelete() {
    let selector = document.getElementById('delcontent').value;
    let todelete = document.querySelectorAll(selector);
    for(let i = 0; i < todelete.length; i++){
        todelete[i].remove();
    }
}

window.addEventListener('DOMContentLoaded', init);
