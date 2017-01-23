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
## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-copy-file.git
```

## Examples

Copy one file to one directory.

```js
copy( '/path/to/file.txt', '/path/to/new/dir' )
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
