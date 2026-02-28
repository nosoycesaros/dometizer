# Enhanced Attribute Handling

## Purpose

This capability provides comprehensive attribute and property handling for DOM elements, including dataset attributes and inline styles parameters for efficient element configuration.

## Requirements

### Requirement: Dataset parameter support
The create() and extend() functions SHALL accept a `dataset` parameter that sets data-* attributes on elements efficiently.

#### Scenario: Single data attribute
- **WHEN** user calls create() with dataset: { action: 'submit' }
- **THEN** the element has data-action="submit" attribute set

#### Scenario: Multiple data attributes
- **WHEN** user calls create() with dataset: { toggle: 'modal', target: '#dialog' }
- **THEN** the element has data-toggle="modal" and data-target="#dialog" attributes set

#### Scenario: Data attribute with null value
- **WHEN** user provides dataset with null or undefined values
- **THEN** those attributes are not set on the element

### Requirement: Inline styles parameter support
The create() and extend() functions SHALL accept a `styles` parameter that applies CSS properties directly to element.style.

#### Scenario: Single style property
- **WHEN** user calls create() with styles: { backgroundColor: 'blue' }
- **THEN** the element has style.backgroundColor set to 'blue'

#### Scenario: Multiple style properties
- **WHEN** user calls create() with styles: { width: '100px', height: '50px' }
- **THEN** the element has both style.width and style.height set correctly

#### Scenario: Style property with null value
- **WHEN** user provides styles with null or undefined values
- **THEN** those style properties are not applied to the element

### Requirement: Null-safe attribute management
All attribute and property setting operations SHALL check for null and undefined values to prevent setting empty or invalid attributes.

#### Scenario: Null attribute value skipped
- **WHEN** user provides attributes with null values
- **THEN** setAttribute is not called for null values

#### Scenario: Undefined property value skipped
- **WHEN** user provides configuration with undefined values
- **THEN** no DOM operation is performed for undefined properties

#### Scenario: Empty string values processed
- **WHEN** user provides empty string values
- **THEN** the empty string is set as the attribute value (empty strings are valid)