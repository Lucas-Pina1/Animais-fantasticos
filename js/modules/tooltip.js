// export default function initTooltip() {
//   const tooltips = document.querySelectorAll('[data-tooltip]');

//   const onMouseMove = {
//     handleEvent(event) {
//       this.tooltipBox.style.top = `${event.pageY + 20}px`;
//       this.tooltipBox.style.left = `${event.pageX + 20}px`;
//     },
//   };

//   const onMouseLeave = {
//     handleEvent() {
//       this.tooltipBox.remove();
//       this.element.removeEventListener('mouseleave', onMouseLeave);
//       this.element.removeEventListener('mousemove', onMouseMove);
//     },
//   };

//   function criarTooltipBox(element) {
//     const tooltipBox = document.createElement('div');
//     const text = element.getAttribute('aria-label');
//     tooltipBox.classList.add('tooltip');
//     tooltipBox.innerText = text;
//     document.body.appendChild(tooltipBox);
//     return tooltipBox;
//   }

//   function onMouseOver() {
//     const tooltipBox = criarTooltipBox(this);

//     onMouseMove.tooltipBox = tooltipBox;
//     this.addEventListener('mousemove', onMouseMove);

//     onMouseLeave.tooltipBox = tooltipBox;
//     onMouseLeave.element = this;
//     this.addEventListener('mouseleave', onMouseLeave);
//   }

//   tooltips.forEach((item) => {
//     item.addEventListener('mouseover', onMouseOver);
//   });
// }

export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // Move a tooltip xom base em seus estilos de acordo com a posição do mouse
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;

    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  // Remove a tooltip e os eventos de mousemove e mouseleave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }

  // cria a tooltip box e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  // Cria a tooltip e adiciona os eventos de mousemove e mouseleave ao target
  onMouseOver({ currentTarget }) {
    // cria a tooltipbox e coloca em uma propriedade
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  // Adiciona os eventos de mouseover a cada tooltip
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvent();
    }
    return this;
  }
}
