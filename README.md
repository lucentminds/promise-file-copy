# promise-file-copy
NodeJs module that copies files or directories to one or more locations.


## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-file-copy.git
```

### Useage:

```js
var copy = require( 'promise-file-copy' );

copy( '/path/to/file.txt', '/path/to/new/file.txt' )
.then(function( oResult ){

    console.log( 'Success!' );

});
```

## Examples

Copy one file to one directory.

```js
copy( '/path/to/file.txt', '/path/to/new/dir' )
.then(function( oResult ){

    console.log( 'Success!' );

});
```

Copy one directory to another directory.

```js
copy( '/path/to/old/dir', '/path/to/new/dir' )
.then(function( oResult ){

    console.log( 'Success!' );

});
```

Copy multiple files to the same directory.

```js
copy( ['/path/to/file1.txt', '/path/to/file2.txt'], '/path/to/new/dir' )
.then(function( aResult ){

    console.log( 'Success!' );

});
```

Copy mutliple files to multiple directories.

```js
copy( ['/path/to/file1.txt', '/path/to/file2.txt'], ['/path/to/new/dir1','/path/to/new/dir2'] )
.then(function( aResult ){

    console.log( 'Success!' );

});
```
