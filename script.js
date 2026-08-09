document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.nav');
  if (button && nav) {
    button.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-requires-agreement]').forEach(function (action) {
    const agreementName = action.getAttribute('data-requires-agreement');
    const checkbox = document.querySelector('[data-agreement="' + agreementName + '"]');
    if (!checkbox) return;

    function syncAgreementState() {
      const enabled = checkbox.checked;
      action.classList.toggle('is-disabled', !enabled);
      action.setAttribute('aria-disabled', String(!enabled));
      if (enabled) {
        action.removeAttribute('tabindex');
      } else {
        action.setAttribute('tabindex', '-1');
      }
    }

    checkbox.addEventListener('change', syncAgreementState);
    syncAgreementState();
  });

  // V1.6.2 language switch: default Traditional Chinese, optional footer-side Simplified Chinese display.
  const zhHansMap = {
    '醫':'医','體':'体','診':'诊','師':'师','與':'与','們':'们','關':'关','於':'于','專':'专','欄':'栏','聯':'联','絡':'络','線':'线','說':'说','請':'请','務':'务','費':'费','藥':'药','檢':'检','查':'查','協':'协','助':'助','認':'认','證':'证','預':'预','約':'约','臺':'台','台':'台','灣':'湾','雙':'双','北':'北','區':'区','後':'后','續':'续','紀':'纪','錄':'录','報':'报','號':'号','項':'项','術':'术','餘':'余','裡':'里','裏':'里','長':'长','當':'当','會':'会','進':'进','時':'时','間':'间','點':'点','隱':'隐','私':'私','權':'权','條':'条','資':'资','訊':'讯','適':'适','應':'应','個':'个','選':'选','擇':'择','顯':'显','簡':'简','開':'开','啟':'启','閉':'闭','單':'单','頁':'页','覽':'览','現':'现','場':'场','帶':'带','領':'领','繳':'缴','從':'从','發':'发','準':'准','備':'备','內':'内','將':'将','這':'这','讓':'让','對':'对','實':'实','際':'际','無':'无','醫':'医','療':'疗','院':'院','所':'所','聲':'声','明':'明','價':'价','則':'则','變':'变','籌':'筹','劃':'划','網':'网','站':'站','繁':'繁','简':'简','體':'体','版':'版','本':'本','显':'显','示':'示','默认':'默认','默':'默','認':'认','步':'步','門':'门','戶':'户','緊':'紧','急':'急','暫':'暂','興':'兴','復':'复','稱':'称','號':'号','處':'处','理':'理','遞':'递','審':'审','核':'核','電':'电','話':'话','郵':'邮','件':'件','須':'须','讀':'读','為':'为','達':'达','過':'过','還':'还','傾':'倾','聽':'听','難':'难','穩':'稳','點':'点','員':'员','壓':'压','縮':'缩','換':'换','導':'导','列':'列','寬':'宽','滿':'满','歡':'欢','離':'离','習':'习','學':'学','斷':'断','決':'决','擔':'担','憂':'忧','獨':'独','親':'亲','職':'职','衛':'卫','統':'统','歸':'归','範':'范','參':'参','數':'数','據':'据','儲':'储','異':'异','動':'动','產':'产','設':'设','計':'计','廣':'广','告':'告','極':'极','處':'处','保':'保','護':'护','質':'质','義':'义','務':'务','營':'营','聯':'联','絡':'络','體':'体','歷':'历','齡':'龄','歲':'岁','優':'优','級':'级','態':'态','經':'经','驗':'验','護':'护','復':'复','雜':'杂','轉':'转','帳':'账','匯':'汇','與':'与'
  };

  function convertToHans(text) {
    return text.split('').map(function (char) { return zhHansMap[char] || char; }).join('');
  }

  function walkTextNodes(rootNode, callback) {
    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(callback);
  }

  function createLanguageSwitcher(extraClass) {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher' + (extraClass ? ' ' + extraClass : '');
    switcher.setAttribute('aria-label', '語言選擇');
    switcher.innerHTML = '<span class="language-label">語言：</span><button type="button" data-lang-choice="zh-Hant" aria-label="切換為繁體中文">繁體中文</button><button type="button" data-lang-choice="zh-Hans" aria-label="切換為簡體中文">简体中文</button>';
    return switcher;
  }

  function ensureLanguageSwitcher() {
    const footer = document.querySelector('.footer');
    if (!footer || footer.querySelector('.language-switcher')) return;

    const switcher = createLanguageSwitcher('footer-language-switcher');
    const copyright = footer.querySelector('.copyright');
    if (copyright) {
      footer.insertBefore(switcher, copyright);
    } else {
      footer.appendChild(switcher);
    }
  }

  function setLanguage(lang) {
    const target = lang === 'zh-Hans' ? 'zh-Hans' : 'zh-Hant';
    document.documentElement.lang = target;
    walkTextNodes(document.body, function (node) {
      if (typeof node.__sanaviaOriginalText === 'undefined') node.__sanaviaOriginalText = node.nodeValue;
      node.nodeValue = target === 'zh-Hans' ? convertToHans(node.__sanaviaOriginalText) : node.__sanaviaOriginalText;
    });
    document.querySelectorAll('[alt], [title], [aria-label], [placeholder]').forEach(function (el) {
      ['alt', 'title', 'aria-label', 'placeholder'].forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        const key = '__sanaviaOriginal_' + attr;
        if (typeof el[key] === 'undefined') el[key] = el.getAttribute(attr);
        el.setAttribute(attr, target === 'zh-Hans' ? convertToHans(el[key]) : el[key]);
      });
    });
    localStorage.setItem('sanavia-lang', target);
    document.querySelectorAll('[data-lang-choice]').forEach(function (btn) {
      const active = btn.getAttribute('data-lang-choice') === target;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  ensureLanguageSwitcher();
  document.querySelectorAll('[data-lang-choice]').forEach(function (btn) {
    btn.addEventListener('click', function () { setLanguage(btn.getAttribute('data-lang-choice')); });
  });
  setLanguage(localStorage.getItem('sanavia-lang') || 'zh-Hant');

});
