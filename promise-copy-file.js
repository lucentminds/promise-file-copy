/**
 * 01-05-2017
 * NodeJs module that copies files or directories to one or more locations.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* global JSON:false */

var fs = require( 'fs' );
var path = require( 'path' );
var Q = require( 'q' );
var fse = require( 'fs-extra' );
var resolvePath = require( 'promise-resolve-path' );
var copy = module.exports = function( aSrc, aDest ){
    var deferred = Q.defer();
    var cSrcType = typeof aSrc;
    var cDestType = typeof aDest;
    var aSources;

    switch( true ) {
    case ( cSrcType === 'string' ):
        aSrc = [aSrc];
        break;

    case Array.isArray( aSrc ):
        break;

    default:
        deferred.reject( 'Invalid source path argument: '.concat( aSrc ) );
        return deferred.promise;

    }// /switch()


    switch( true ) {
    case ( cDestType === 'string' ):
        aDest = [aDest];
        break;

    case Array.isArray( aDest ):
        break;

    default:
        deferred.reject( 'Invalid destination path argument: '.concat( aDest ) );
        return deferred.promise;

    }// /switch()

    // Resolve source paths and verify their existance.
    resolvePath( aSrc, true )
    .then(function( aResults ){

        // Determines the global sources.
        aSources = aResults;
       
        // Resolve desitination paths.
        return resolvePath( aDest )

    })
    .then(function( aDestinations ){
        var s, ss, d, dd, aPromises = [];
        var cSrc;

        // Loop over each source.
        for( s = 0, ss = aSources.length; s < ss; s++ ) {
            cSrc = aSources[ s ];

            // Loop over each destination.
            for( d = 0, dd = aDestinations.length; d < dd; d++ ) {
                aPromises.push( copyOneFile( cSrc, aDestinations[ d ] ) );
            }// /for()

        }// /for()
        
        // Either wait for all paths to be copied or reject one.
       return Q.all( aPromises );
       
    })
    .then(function( aCopied ){
        if( cSrcType === 'string' && cDestType === 'string' )  {
            deferred.resolve( aCopied[0] );
        }
        else {
            deferred.resolve( aCopied );
        }
    })
    .fail(function( err ){
       deferred.reject( err );
    }).done();

    return deferred.promise;
};// /copy()

var copyOneFile = function( cPathSrc, cPathDest ) {
    var deferred = Q.defer();
    
    // Either wait for all paths to be evaluated or reject one.
    Q.all( [
        determinePathType( cPathSrc ),
        determinePathType( cPathDest )
    ] ).then(
        // All resolved.
        function( aResults ){
            if( aResults[0] === 'file' && aResults[1] === 'directory' ){
                /** 
                 * We are copying a file into a directory without changing the 
                 * file's name.
                 */
                cPathDest = path.join( cPathDest, path.basename( cPathSrc ) );
            }

            /** 
             * Else the destination directory does NOT exist yet or both source
             * and destination are files.
             */
        },

        // One rejected.
        function( err ){
            throw new Error( err );
        } )
    .then(function(){
        fse.copy( cPathSrc, cPathDest, {}, function( err ) {
            if (err) {
                return deferred.reject( err );
            }

            deferred.resolve({
                src: cPathSrc,
                dest: cPathDest
            });

        });

    })
    .fail(function( err ){
        deferred.reject( err );
    }).done();

    return deferred.promise;
};// /copyOneFile()

var determinePathType = function( cPath ) {
    var deferred = Q.defer();

    fs.stat( cPath, function ( err, stats ) {
        if ( err ) {

            if( err.code === 'ENOENT') {
                // This isn't really an error. The path just doesn't exist.
                deferred.resolve( 'ENOENT' );
            }
            return deferred.reject( err );
        }

        switch( true ){
        case stats.isFile():
            deferred.resolve( 'file' );
            break;

        case stats.isDirectory():
            deferred.resolve( 'directory' );
            break;
            
        default:
            deferred.resolve( 'unknown' );

        }// /switch()
    });

    return deferred.promise;
};// /determinePathType()