# Example
this is an Example .weeabu file. Non binary, later it'll be compressed using binary + lzma.

## Format
```js
"FileVersion""ArrayLength"
"[0]""FileType(String)""StringLength""https://someurl.com"
"[1]""FileType(Image(JPG))""FileLength""......"
```

## FileTypes
`String` = `0x0a`
`Image` = `0x0b`
`Image(JPG)` = `0x0ba`
`Image(PNG)` = `0x0bA`
`Image(GIF)` = `0x0bb`