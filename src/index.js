// -! 不会执行之前的 pre 和 normal loader 的处理
// ! 不会执行之前的 normal loader 的处理
// !! 什么都不执行，只执行自己
import '!!inline-loader!./a.js'

export const a = 1
