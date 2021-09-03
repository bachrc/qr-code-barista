mod utils;

use wasm_bindgen::prelude::*;
use qrcode::QrCode;
use image::{Luma, DynamicImage, ImageResult, ImageOutputFormat, Rgb};
use base64::write::EncoderStringWriter;
use base64::STANDARD;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, qr-code-generator!");
}

#[wasm_bindgen]
pub fn generate_qr_code_from_url(url: &str) -> JsValue {
    // Encode some data into bits.
    let code = QrCode::new(url).unwrap();

// Render the bits into an image.
    let image = code.render::<Luma<u8>>().build();

    let base64 = base64_png(DynamicImage::ImageLuma8(image))
        .expect("Unable to convert image to base64 string");

    return JsValue::from_str(&base64);
}

fn base64_png(img: DynamicImage) -> ImageResult<String> {
    let mut buf = String::from("");

    {
        let mut writer = EncoderStringWriter::from(&mut buf, STANDARD);
        img.write_to(&mut writer, ImageOutputFormat::Png)?;
    }

    Ok(buf)
}

