/*------------------------------------------------------------------------*/
/*  Add/remove element
/*------------------------------------------------------------------------*/

$( document ).on("click", ".js-add-element", function(e) {

    e.preventDefault();

    var $elements     = $( '.js-elements' ),
        $element     = $( '.js-element' ).first();

    // Create new product jQuery object
    var $newElement         = $element.clone(),
        $newElementLink     = $newElement.find( 'a' );

    // Add class
    $newElement.addClass( 'js-element-new' );

    // Change plus classes to remove
    $newElementLink.removeClass( 'add js-add-element' );
    $newElementLink.addClass( 'remove js-remove-element' );

    // Add new element to the DOM
    $( $elements ).append( $newElement );

    // Recount and renumber the elements
    recountElements();

});

$( document ).on("click", ".js-remove-element", function(e) {

    e.preventDefault();

    var $element     = $( '.js-element') ;

    // Only remove the current element
    $( this ).closest( $element ).remove();

    // Recount and renumber the elements
    recountElements();

});

function recountElements() {

    var $element      = $( '.js-element' ),
        $attrElement = $( '.text-input' ),

        attrId      = 'id',
        attrName    = 'name',
        count       = 1,
        prefix      = 'product-'

        // (Re)count every $element and add corresponding attribute values
        $($element).each(function() {
            $( this ).find( $attrElement ).attr( attrId, prefix + count ).attr( attrName, prefix + count );
            count++;
        });
}
