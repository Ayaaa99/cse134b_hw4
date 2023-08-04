/* dom.js */

function init() {

    initBtns();

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

    element = document.getElementById('basicBtn');
    element.addEventListener('click', function () {
        basicclone();
    });

    element = document.getElementById('advcloBtn');
    element.addEventListener('click', function () {
        advclone();
    });
}

function initBtns() {
    const fieldsets = document.querySelectorAll('fieldset');
    fieldsets[0].innerHTML += 
    '<br>\
    <textarea id="wlkresult" rows="4" cols="30"></textarea>\
    <label for="advwalkBtn">Advanced Walk</label>\
    <input type="button" id="advwalkBtn" value="Advanced Walk"><br>\
    <textarea id="advwlkresult" rows="4" cols="30"></textarea>';

    fieldsets[1].innerHTML +=
    '<label for="advmodifyBtn">Advanced Modification</label>\
    <input type="button" id="advmodifyBtn" value="Advanced Modify">';

    fieldsets[2].innerHTML += 
    '<label>Advanced Addition</label>\
    <label for="elements">Choose an element:</label>\
    <select id="elements">\
        <option value="textnode">Text Node</option>\
        <option value="comment">Comment</option>\
        <option value="element">Element</option>\
    </select><br>\
    <label for="addtag">New element tag:</label>\
    <textarea id="addtag" rows="1" cols="30"></textarea><br>\
    <label for="addcontent">New element content:</label>\
    <textarea id="addcontent" rows="4" cols="30"></textarea><br>\
    <input type="button" id="addeleBtn" value="Add Element"><br>';

    fieldsets[3].innerHTML +=
    '<label for="safedelBtn">Safe Delete</label>\
    <input type="button" id="safedelBtn" value="Safe Delete">\
    <label for="delcontent">Content to delete:</label>\
    <textarea id="delcontent" rows="4" cols="30"></textarea><br>\
    <label for="slcdelBtn">Selector Delete</label>\
    <input type="button" id="slcdelBtn" value="Selector Delete">';

    fieldsets[4].innerHTML += 
    '<label for="basicBtn">Basic Clone</label>\
    <input type="button" id="basicBtn" value="Basic Clone">\
    <label for="advcloBtn">Advanced Clone</label>\
    <input type="button" id="advcloBtn" value="Advanced Clone">';

    document.querySelector('body').innerHTML +=
    '<template>\
        <div class="card">\
            <img src="images/lucy-insert-coin-Cover-Art.png" alt="Card Image" style="width:100%;">\
            <h2>Title</h2>\
            <p>short text</p>\
            <a href="ucsd.edu">This is a link</a>\
        </div>\
    </template>';

    document.getElementById('p1').insertAdjacentHTML('afterend',
    '<output>This is output for the new elements:</output>');
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
    const date = ' ' + (new Date()).toLocaleString();

    if (type == 'textnode'){
        let text = 'New Text Node';
        let input = document.getElementById('addcontent').value;
        if (input != ''){
            text = input;
        }
        text += date;
        out.innerHTML += `<p>${text}</p>`;
    }
    if (type == 'comment'){
        let comment = 'New Comment';
        let input = document.getElementById('addcontent').value;
        if (input != ''){
            comment = input;
        }
        comment += date
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
        content += date;
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

function basicclone() {
    const toclone = document.getElementById('p1');
    let newnode = toclone.cloneNode(true);
    document.querySelector('output').appendChild(newnode);
}

function advclone() {
    const imgs = ['images/image1.png','images/image2.jpg','images/image3.jpeg','images/image4.png','images/image5.jpg'];
    const titles = ['Insert Coin','Childhood','Gatcha!','Inside','Dear.']
    const texts = ['random text1','random text2','random text3','random text4','random text5'];
    const links = ['https://rateyourmusic.com/release/ep/lucy/insert-coin/',
                    'https://rateyourmusic.com/release/album/lucy/childhood/',
                    'https://rateyourmusic.com/release/single/lucy/gatcha/',
                    'https://rateyourmusic.com/release/single/lucy/inside/',
                    'https://rateyourmusic.com/release/single/lucy/dear/'
                ]
    let index = Math.floor(Math.random() * 5);

    let temp = document.querySelector('template');
    let clon = temp.content.cloneNode(true);
    let card = clon.childNodes[1];
    card.childNodes[1].src = imgs[index];
    card.childNodes[3].innerHTML = titles[index];
    card.childNodes[5].innerHTML = texts[index];
    card.childNodes[7].href = links[index];
    document.body.appendChild(clon);
}

window.addEventListener('DOMContentLoaded', init);
