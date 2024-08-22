/**
 * 使用md-editor-rt的markdown编辑器组件的参数类型
 */
export type MarkdownEditorProps = {
  /**
   * 预览部分的主题样式
   */
  previewTheme?: string;
  /**
   * 编辑器中的内容
   */
  content?: string;
  /**
   * 编辑器中内容改变后触发的函数
   * @param content
   */
  setContent: (content?: string) => void;
  /**
   * 一些外部处理器函数
   */
  handlers?: {
      /**
       * 浏览器全屏切换事件处理器
       * @param value
       */
      onBroswerScreen?: (value: boolean) => void;
      /**
       * 页面全屏事件处理器
       * @param value
       */
      onPageScreen?: (value: boolean) => void;
  };
} & Record<string, any>;

/**
* markdown预览组件的参数类型
*/
export type MarkdownPreviewProps = {
  /**
   * 编辑器ID,默认为"markdown-preview-editor"
   */
  editorId?: string;
  /**
   * 主题风格,这里没有定义为"theme",因为这是为后续明暗主题切换保留的
   */
  previewTheme?: string;
  /**
   * md文档的内容
   */
  text: string;
};
