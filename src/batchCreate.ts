import { Attributes } from './extend'
import create from './create'

/**
 * Performance metrics collected during batch creation operations
 */
export interface BatchMetrics {
  /** Total time taken for the batch operation in milliseconds */
  totalTime: number
  /** Number of elements successfully created */
  elementsCreated: number
  /** Average time per element creation in milliseconds */
  averageTimePerElement: number
}

/**
 * Configuration options for batch DOM element creation
 */
export interface BatchCreateOptions {
  /**
   * Number of elements to process in each chunk for DocumentFragment optimization
   * @default 100
   */
  chunkSize?: number

  /**
   * Container element to automatically append created elements to
   * If provided, elements will be appended to this container using DocumentFragment optimization
   */
  container?: HTMLElement

  /**
   * Callback function called periodically to report progress
   * @param completed - Number of data items processed so far (including skipped/failed items)
   * @param total - Total number of data items to process
   */
  onProgress?: (completed: number, total: number) => void

  /**
   * Callback function called when batch creation completes
   * @param metrics - Performance metrics for the completed operation
   */
  onComplete?: (metrics: BatchMetrics) => void
}

/**
 * Efficiently creates multiple DOM elements from an array of data using a template function
 * and automatic DocumentFragment optimization for optimal performance.
 *
 * @template T - Type of data items in the input array
 * @param data - Array of data items to create elements from
 * @param template - Function that converts each data item to element attributes
 * @param options - Optional configuration for chunk processing, auto-append, and callbacks
 * @returns Array of created HTMLElements
 *
 * @example
 * // Basic usage
 * const buttons = batchCreate(buttonData, (data, index) => ({
 *   type: 'button',
 *   text: data.label,
 *   className: ['btn', index % 2 === 0 ? 'even' : 'odd']
 * }));
 *
 * @example
 * // With performance tracking and auto-append
 * const tableRows = batchCreate(rowData, (row, index) => ({
 *   type: 'tr',
 *   children: row.cells.map(cell => create({ type: 'td', text: cell }))
 * }), {
 *   container: tableElement,
 *   onComplete: (metrics) => console.log(`Created ${metrics.elementsCreated} rows in ${metrics.totalTime}ms`)
 * });
 */
export default function batchCreate<T>(
  data: T[],
  template: (item: T, index: number) => Attributes,
  options: BatchCreateOptions = {}
): HTMLElement[] {
  // Handle empty data array case - return early without template execution
  if (data.length === 0) {
    return []
  }

  // Set up default options and validate
  const { chunkSize = 100, container, onProgress, onComplete } = options

  // Validate chunkSize
  const validatedChunkSize = Math.max(1, Math.floor(chunkSize || 100))

  // Validate callbacks are functions if provided
  const validOnProgress = typeof onProgress === 'function' ? onProgress : undefined
  const validOnComplete = typeof onComplete === 'function' ? onComplete : undefined

  // Performance tracking
  const startTime = globalThis.performance?.now() || Date.now()
  const elements: HTMLElement[] = []

  // Process elements in chunks for DocumentFragment optimization and progress tracking
  let processedCount = 0

  while (processedCount < data.length) {
    // Create DocumentFragment for this chunk
    const fragment = document.createDocumentFragment()

    // Process one chunk
    const chunkEnd = Math.min(processedCount + validatedChunkSize, data.length)

    for (let i = processedCount; i < chunkEnd; i++) {
      try {
        const item = data[i]
        if (item === undefined) continue // Skip undefined items
        const attributes = template(item, i)
        const element = create(attributes)
        elements.push(element)

        // Add element to current chunk's DocumentFragment
        fragment.appendChild(element)
      } catch (error) {
        // Log template function errors but continue processing other elements
        console.error(`batchCreate: Template function failed for item at index ${i}:`, error)
        // Continue with next item - don't fail entire batch for one error
      }
    }

    // If container is specified, append this chunk's fragment
    if (container) {
      container.appendChild(fragment)
    }

    processedCount = chunkEnd

    // Call progress callback if provided
    if (validOnProgress) {
      validOnProgress(processedCount, data.length)
    }
  }

  // Calculate performance metrics
  const endTime = globalThis.performance?.now() || Date.now()
  const totalTime = endTime - startTime
  const metrics: BatchMetrics = {
    totalTime,
    elementsCreated: elements.length,
    averageTimePerElement: elements.length > 0 ? totalTime / elements.length : 0,
  }

  // Call completion callback if provided
  if (validOnComplete) {
    validOnComplete(metrics)
  }

  return elements
}
