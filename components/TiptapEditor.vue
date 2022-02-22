<template>
  <div class="editor-wrapper grey lighten-4 pb-1">
    <div v-if="editor" class="pa-2">
      <v-btn
        outlined
        elevation="0"
        small
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <v-icon>mdi-format-bold</v-icon>
      </v-btn>
      <v-btn
        outlined
        elevation="0"
        small
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>

      <v-btn
        outlined
        elevation="0"
        small
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <v-icon>mdi-format-paragraph</v-icon>
      </v-btn>
      <v-btn
        outlined
        elevation="0"
        small
        :class="{
          'is-active': editor.isActive('heading', { level: 1 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <v-icon>mdi-format-header-1</v-icon>
      </v-btn>
      <v-btn
        outlined
        elevation="0"
        small
        :class="{
          'is-active': editor.isActive('heading', { level: 2 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <v-icon>mdi-format-header-2</v-icon>
      </v-btn>
      <v-btn
        outlined
        elevation="0"
        small
        :class="{
          'is-active': editor.isActive('heading', { level: 3 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <v-icon>mdi-format-header-3</v-icon>
      </v-btn>

      <v-btn
        outlined
        elevation="0"
        small
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
    </div>
    <editor-content class="mx-2 mb-1 editor" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [StarterKit],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.v-application {
  .editor-wrapper.grey {
    border: 1px solid #ccc !important;
    border-radius: 4px;
  }

  .editor {
    border: 1px solid #ccc;
    border-radius: 4px;
    // min-height: 200px;
    height: 100%;
    // max-height: 700px;

    > div {
      padding: 6px 12px;
      //   height: 100% !important;
    }
  }

  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  }
}
</style>
