//@ts-nocheck
import { Descendant, Text } from 'slate'
import { Content } from 'pdfmake/interfaces'

function slateToPdfMake(value: Descendant[]): Content[] {
    return value.flatMap(node => {
        if (Text.isText(node)) {
            return textNodeToPdfMake(node)
        } else {
            return elementNodeToPdfMake(node)
        }
    })
}

function textNodeToPdfMake(node: Text): Content {
    const content: any = { text: node.text }

    if (node.bold) content.bold = true
    if (node.italic) content.italics = true
    if (node.underline) content.decoration = 'underline'
    if (node.code) content.style = 'code'

    return content
}

function elementNodeToPdfMake(node: any): Content {
    let children = node.children.flatMap((child: any) => slateToPdfMake([child]))
    let content: any
    if (children[0]?.text === '') children = '.'
    console.log(children);
    switch (node.type) {
        case 'paragraph':
            content = { text: children }
            break
        case 'block-quote':
            content = { text: children, margin: [0, 10], fontSize: 10, italics: true }
            break
        case 'heading-one':
            content = { text: children, fontSize: 24, bold: true }
            break
        case 'heading-two':
            content = { text: children, fontSize: 20, bold: true }
            break
        case 'bulleted-list':
            content = { ul: children }
            break
        case 'numbered-list':
            content = { ol: children }
            break
        case 'list-item':
            content = { text: children }
            break
        case 'breakPage':
            content = children
            break
        default:
            content = { text: children }
            break
    }

    if (node.align) {
        content.alignment = node.align
    }

    content.margin = [40, 0, 40, 0]

    return content
}

export default slateToPdfMake