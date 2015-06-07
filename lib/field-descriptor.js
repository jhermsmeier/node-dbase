/**
 * FieldDescriptor
 * @return {FieldDescriptor}
 */
function FieldDescriptor() {
  
  if( !(this instanceof FieldDescriptor) )
    return new FieldDescriptor()
  
  this.name = ''
  this.type = ''
  this.address = 0x00000000
  this.length = 0x00
  this.decimalCount = 0x00
  // this.reserved = 0x0000
  this.workAreaId = 0x00
  // this.reserved = 0x0000
  this.setFields = 0x00
  // this.reserved = ...
  this.indexField = 0x00
  
}

/**
 * FieldDescriptor prototype
 * @type {Object}
 */
FieldDescriptor.prototype = {
  
  constructor: FieldDescriptor,
  
  parse: function( buffer ) {
    
    this.name = buffer.toString( 'ascii', 0, 10 )
      .replace( /\u0000+$/g, '' )
    this.type = buffer.toString( 'ascii', 11, 12 )
    this.address = buffer.readUInt32LE( 12 )
    this.length = buffer.readUInt8( 16 )
    this.decimalCount = buffer.readUInt8( 17 )
    // this.reserved = 0x0000
    this.workAreaId = buffer.readUInt8( 20 )
    // this.reserved = 0x0000
    this.setFields = buffer.readUInt8( 23 )
    // this.reserved = ...
    this.indexField = buffer.readUInt8( 31 )
    
    return this
    
  },
  
  toBuffer: function() {
    
  },
  
}

// Exports
module.exports = FieldDescriptor
