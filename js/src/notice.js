(function ( window, document ) {
    var _uniquId = 0,
        _body = document.getElementsByTagName( "body" )[ 0 ],
        _types = {
            success: {
                icon: "fa fa-thumbs-up",
                className: "success"
            },
            info: {
                icon: "fa fa-info",
                className: "info"
            },
            warning: {
                icon: "fa fa-warning",
                className: "warning"
            },
            error: {
                icon: "fa fa-times",
                className: "error"
            }
        };

    var notice = {
        show ( args ) {
            var id = ++_uniquId,
                format = args.format || "toast";


            render( {
                message: args.message,
                format: args.format,
                type: _types[args.type],
                id: id
            } );

            if ( args.autoRemove === false ) {
                return {
                    remove () {
                        removeNotice( id, format );
                    },
                    update ( newArgs ) {
                        updateNotice( id, newArgs );
                    }
                }
            }

            return null;
        }
    };

    window.Notice = notice;

    let removeNotice = ( id, format ) => {

    };

    let updateNotice = ( id, args ) => {

    };

    let render = ( notice ) => {
        var containerDiv = document.createElement( "div" ),
            listItem = document.createElement("div"),
            iconDiv = document.createElement( "div" ),
            messageDiv = document.createElement( "div" ),
            dismissDiv = document.createElement( "div" );

        containerDiv.className = `notice-container ${notice.format}`;

        listItem.className = `notice-list-item ${notice.type.className}`;
        listItem.setAttribute( "data-notice-id", notice.id );

        iconDiv.className = `notice-icon ${notice.type.icon}`;

        messageDiv.className = "notice-message";
        messageDiv.textContent = notice.message;

        dismissDiv.className = "notice-dismiss";
        dismissDiv.setAttribute( "data-notice-id", notice.id );
        dismissDiv.textContent = "x";

        listItem.appendChild( iconDiv );
        listItem.appendChild( messageDiv );
        listItem.appendChild( dismissDiv );
        containerDiv.appendChild(listItem);

        document.body.appendChild( containerDiv );

        console.log("rendering: ", containerDiv);
        var allNotices = document.querySelector("[class*='notice-list-item']");
        console.log("all notices: ", allNotices);
    };

    let findNotice = ( id ) => {
        return document.querySelectorAll(`[data-notice-id='${id}']`)[0];

    };

    let addClass = (el, className ) => {
        el.className += ` ${className}`;
        return el;
    };

    let removeClass = (el, className ) => {
        el.className = el.className.replace(className, "");
        return el;
    };

})( this, document );