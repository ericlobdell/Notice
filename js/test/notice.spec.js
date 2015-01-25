/**
 * Created by eric on 1/24/15.
 */
describe( "Notice", function () {
    it( "should exist", function () {
        expect( Notice ).toBeDefined();
    } );

    it( "should have a show function for creating a new instance of a notice", function () {
        expect( Notice.show ).toBeDefined();
    } );

    describe( "show()", function () {
        it( "should return null if autoRemove not set to false", function () {
            var args = {};
            expect( Notice.show( args ) ).toBe( null );
        } );

        describe( "show with autoRemove === false", function () {
            it( "should return an object with a remove function to manually remove it from the UI", function () {
                var args = { autoRemove: false },
                    sut = Notice.show( args );

                expect( sut.remove ).toBeDefined();
            } );

            it( "should return an object with an update function to be able to update the message in place", function () {
                var args = { autoRemove: false },
                    sut = Notice.show( args );

                expect( sut.update ).toBeDefined();
            } );
        } );


    } );
} );
