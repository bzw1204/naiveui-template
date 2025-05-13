/*
  需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

  使用：在 Dom 上加上 v-draggable 即可
  <div class="dialog-model" v-draggable="onDrag"></div>
  function onDrag(coords) {
    console.log('Dragging:', coords)
  }
*/
import type { Directive, DirectiveBinding } from 'vue'

const draggable: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let dragStartX: number = 0
    let dragStartY: number = 0
    let currentX: number = 0
    let currentY: number = 0

    el.onmousedown = (e: MouseEvent) => {
      dragStartX = e.clientX - currentX
      dragStartY = e.clientY - currentY

      document.onmousemove = (e: MouseEvent) => {
        currentX = e.clientX - dragStartX
        currentY = e.clientY - dragStartY

        // Update the element's position
        el.style.left = `${currentX}px`
        el.style.top = `${currentY}px`

        // Call the provided callback with the new coordinates
        if (binding.value) {
          binding.value({ x: currentX, y: currentY })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    // Set initial position
    currentX = el.offsetLeft
    currentY = el.offsetTop
  },
  unmounted() {
    document.onmousemove = null
    document.onmouseup = null
  }
}
export default draggable
