# promise-copy-file
NodeJs module that copies files or directories to one or more locations.

### Useage:

```js
var copy = require( 'promise-copy-file' );

copy( '/path/to/file.txt', '/path/to/new/file.txt' )
.then(function( oResult ){

    console.log( 'Success!' );

});
```

Or this...

```js
copy( '/path/to/file.txt', '/path/to/new/dir' )
.then(function( oResult ){

    console.log( 'Success!' );

});
```

Or this...

```js
copy( ['/path/to/file1.txt', '/path/to/file2.txt'], '/path/to/new/dir' )
.then(function( aResult ){

    console.log( 'Success!' );

});
```

Or this...

```js
copy( ['/path/to/file1.txt', '/path/to/file2.txt'], ['/path/to/new/dir1','/path/to/new/dir1'] )
.then(function( aResult ){

    console.log( 'Success!' );

});
```