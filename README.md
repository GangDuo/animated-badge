# animated-badge

アニメーション付きバッジ Web コンポーネント。check / cross / minus の3種類をサポートします。

## インストール

```bash
npm install animated-badge
```

## 使い方

### HTML での読み込み

```html
<script type="module" src="node_modules/animated-badge/dist/animated-badge.js"></script>

<animated-badge></animated-badge>
<animated-badge type="cross"></animated-badge>
<animated-badge type="minus"></animated-badge>
```

### バンドラー経由

```js
import 'animated-badge';
```

## API

### 属性

| 属性 | 値 | 説明 |
|------|-----|------|
| `type` | `check`（デフォルト）/ `cross` / `minus` | バッジの種類 |
| `playing` | 存在するだけで有効 | 属性があると `play()` を実行、削除で `reset()` を実行 |

### メソッド

| メソッド | 説明 |
|---------|------|
| `play()` | アニメーションを再生する |
| `reset()` | アニメーションをリセットする |

### CSS カスタムプロパティ

| プロパティ | デフォルト | 説明 |
|-----------|-----------|------|
| `--check-color` | `#4caf50` | バッジの色 |

### カスタマイズ例

```css
/* CSS でカスタマイズ */
animated-badge[type="cross"] {
  --check-color: #f44336;
}
```

```js
// JavaScript でカスタマイズ
document.querySelector('animated-badge').style.setProperty('--check-color', '#2196f3');
```

## ライセンス

MIT
