var dBase = require( './dbase' )

/**
 * Header
 * @return {Header}
 */
function Header() {
  
  if( !(this instanceof Header) )
    return new Header()
  
  this.version = 0x00
  this.lastUpdate = 0x000000 // YYMMDD
  this.numberOfRecords = 0x00000000 // u32
  this.lengthOfHeader = 0x0000 // u16
  this.lengthOfRecord = 0x0000 // u16
  // this.reserved = ...
  this.incompleteTransaction = 0x00
  this.encryptionFlag = 0x00
  this.freeRecordThread = 0x00000000
  // this.reserved = ...
  this.mdxFlag = 0x00
  this.languageDriver = 0x00
  // this.reserved = 0x0000
  this.fieldDescriptors = []
  
}

/**
 * Header prototype
 * @type {Object}
 */
Header.prototype = {
  
  constructor: Header,
  
  parse: function( buffer ) {
    
    this.version = buffer.readUInt8( 0 )
    
    this.lastUpdate = new Date(0)
    this.lastUpdate.setYear( buffer.readUInt8( 1 ) + 1900 )
    this.lastUpdate.setMonth( buffer.readUInt8( 2 ) - 1 )
    this.lastUpdate.setDate( buffer.readUInt8( 3 ) )
    
    this.numberOfRecords = buffer.readUInt32LE( 4 )
    this.lengthOfHeader = buffer.readUInt16LE( 8 )
    this.lengthOfRecord = buffer.readUInt16LE( 10 )
    // this.reserved = ...
    this.incompleteTransaction = buffer.readUInt8( 12 )
    this.encryptionFlag = buffer.readUInt8( 13 )
    this.freeRecordThread = buffer.readUInt32LE( 14 )
    // this.reserved = ...
    this.mdxFlag = buffer.readUInt8( 27 )
    this.languageDriver = buffer.readUInt8( 28 )
    // this.reserved = 0x0000
    this.fieldDescriptors = []
    
    if( buffer.length > 32 ) {
      this.parseFieldDescriptors( buffer )
    }
    
    return this
    
  },
  
  parseFieldDescriptors: function( buffer ) {
    
    var offset = 32
    var size = 32
    var terminator = offset
    var fd = null
    
    while( buffer[ terminator++ ] !== 0x0D ) {
      if( terminator < buffer.length )
        continue
      else break
    }
    
    // FIXME
    if( terminator > offset + ( 32 * 128 ) )
      throw new Error( 'Max 128 fields allowed' )
    
    while( offset + size < terminator ) {
      fd = new dBase.FieldDescriptor()
      fd.parse( buffer.slice( offset, offset += size ))
      this.fieldDescriptors.push( fd )
    }
    
    return this
    
  },
  
  toBuffer: function() {
    
  },
  
}

// Exports
module.exports = Header
