function WYSIWYG({ editorId }) {

    const editor = document.querySelector(`#${editorId}`);

    const editorActionsBlockLevel = editor.querySelector('#__wysiwyg_actions_block_level');
    const editorActionsSelectionLevel = editor.querySelector('#__wysiwyg_actions_selection_level');


    const editableArea = editor.querySelector(`#__wysiwyg_editable_area`);
    editableArea.contentEditable = true;




    // prevent the editor from creating div on enter
    document.execCommand('defaultParagraphSeparator', false, 'p');


    /**
     * Heading size - h1, h2, h3, h4, h5, h6
     * @param {String} headingSize 
     */
    function createHeading(headingSize) {
        document.execCommand('formatBlock', false, headingSize);
    }


    function insertImage() {
        document.execCommand('insertImage', false, "https://jayantsingh.in/static/img/home/me.jpg");
        const currentSelection = document.getSelection();
        console.log(currentSelection);
        currentSelection.anchorNode.parentElement.alternate = "Jayant Image";
    }


    function createLink({openInNewTab=true, }) {
        document.execCommand('createLink', false, 'https://jayantsingh.in');
        const currentSelection = document.getSelection();
        currentSelection.anchorNode.parentElement.target = "_blank";
        currentSelection.anchorNode.parentElement.rel = "noopener noreferrer";
    }


    function createBold() {
        document.execCommand('bold', false, '');
    }

    function createItalic() {
        document.execCommand('italic', false, '');
    }

    function createUnderline() {
        document.execCommand('underline', false, '');
    }

    function createStrikeThrough() {
        document.execCommand('strikeThrough', false, '');
    }


    function createParagraphIfNotPresent() {
        const contentPresent = editableArea.innerHTML;
        if (!contentPresent.match(/<.*>/)) {
            setTimeout(() => {
                document.execCommand('formatBlock', false, 'p');
            }, 0);
        }
    }


    function onSelectionChange() {
        const currentSelection = document.getSelection();

        if (currentSelection.type === "Range") {
            if (currentSelection.toString().length > 0) {
                editorActionsBlockLevel.style.display = 'none';
                editorActionsSelectionLevel.style.display = 'block';
            } else {
                editorActionsBlockLevel.style.display = 'block';
                editorActionsSelectionLevel.style.display = 'none';
            }
        }
    }


    function createCodeBlock() {
        document.execCommand('insertHTML', false, "<pre><code>const colorLetters = '0123456789ABCDEF';</code></pre>");

        // const r = getSelection().getRangeAt(0);
        // r.insertNode(r.createContextualFragment("<pre><code>const colorLetters = '0123456789ABCDEF';</code></pre>"));

        // //select this range
        // getSelection().removeAllRanges();
        // getSelection().addRange(r);
        // //collapse to end/start 
        // getSelection().collapseToEnd()

    }
    

    editableArea.addEventListener('focus', createParagraphIfNotPresent)
    editableArea.addEventListener('keyup', createParagraphIfNotPresent)

    const editorActionsInsertImage = editorActionsBlockLevel.querySelector('#__wysiwyg_actions_insert_image');
    editorActionsInsertImage.addEventListener("click", insertImage);

    const editorActionsHeadingsH1 = editorActionsBlockLevel.querySelector('#__wysiwyg_actions_headings_h1');
    editorActionsHeadingsH1.addEventListener("click", createHeading.bind(null, 'h1'));
    
    const editorActionsHeadingsH2 = editorActionsBlockLevel.querySelector('#__wysiwyg_actions_headings_h2');
    editorActionsHeadingsH2.addEventListener("click", createHeading.bind(null, 'h2'));

    const editorActionsHeadingsH3 = editorActionsBlockLevel.querySelector('#__wysiwyg_actions_headings_h3');
    editorActionsHeadingsH3.addEventListener("click", createHeading.bind(null, 'h3'));

    const editorActionsHeadingsCode = editorActionsBlockLevel.querySelector('#__wysiwyg_actions_headings_code');
    editorActionsHeadingsCode.addEventListener("click", createCodeBlock);

    const editorActionsLink = editorActionsSelectionLevel.querySelector('#__wysiwyg_actions_headings_link');
    editorActionsLink.addEventListener("click", createLink);

    const editorActionsBold = editorActionsSelectionLevel.querySelector('#__wysiwyg_actions_headings_bold');
    editorActionsBold.addEventListener("click", createBold);

    const editorActionsItalic = editorActionsSelectionLevel.querySelector('#__wysiwyg_actions_headings_italic');
    editorActionsItalic.addEventListener("click", createItalic);

    const editorActionsUnderline = editorActionsSelectionLevel.querySelector('#__wysiwyg_actions_headings_underline');
    editorActionsUnderline.addEventListener("click", createUnderline);

    const editorActionsStrikeThrough = editorActionsSelectionLevel.querySelector('#__wysiwyg_actions_headings_strike_through');
    editorActionsStrikeThrough.addEventListener("click", createStrikeThrough);

    

    document.addEventListener('selectionchange', onSelectionChange);




    return {
        insertImage
    }
}


const wysiwyg = WYSIWYG({
    editorId: "wysiwygEditor"
})

console.log(wysiwyg)

// wysiwyg.insertImage()


// blockquote - code - ordered list - unordered list